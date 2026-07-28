import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../interfaces/api-response';

export interface SelectedSlot {
  court_id: string;
  court_name: string;
  time_slot_id: string;
  start_time: string;
  end_time: string;
  date: string;
  price: number;
}

@Component({
  selector: 'app-court-detail',
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './court-detail.html',
  styleUrl: './court-detail.css'
})
export class CourtDetail implements OnInit, OnDestroy {
  centerId = '';
  center: any = null;
  courts: any[] = [];
  reviews: any[] = [];
  services: any[] = [];
  timeSlots: any[] = [];
  
  selectedCourtId = '';
  selectedDate: string;
  
  // Mảng chứa nhiều slot được chọn 
  selectedSlots: SelectedSlot[] = [];
  
  activeGalleryIndex = 0;
  showScrollTop = false;

  private sub: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    const today = new Date();
    this.selectedDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.centerId = params['id'];
      if (this.centerId) {
        this.fetchCenterData();
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }

  fetchCenterData() {
    // 1. Center info
    this.http.get<ApiResponse<any>>(`http://localhost:8000/api/sport-centers/${this.centerId}`).subscribe({
      next: res => {
        if (res?.success) this.center = res.data;
      }
    });

    // 2. Courts
    this.http.get<ApiResponse<any[]>>(`http://localhost:8000/api/courts/sport-centers/${this.centerId}`).subscribe({
      next: res => {
        if (res?.success && res.data.length > 0) {
          this.courts = res.data;
          this.selectedCourtId = this.courts[0]._id; // default select first court
        }
      }
    });

    // 3. Reviews
    this.http.get<ApiResponse<any[]>>(`http://localhost:8000/api/reviews/sport-centers/${this.centerId}`).subscribe({
      next: res => {
        if (res?.success) this.reviews = res.data;
      }
    });

    // 4. Services
    this.http.get<ApiResponse<any[]>>(`http://localhost:8000/api/services/sport-centers/${this.centerId}`).subscribe({
      next: res => {
        if (res?.success) this.services = res.data;
      }
    });

    // 5. Timeslots
    this.http.get<ApiResponse<any[]>>('http://localhost:8000/api/timeslots').subscribe({
      next: res => {
        if (res?.success) this.timeSlots = res.data;
      }
    });
  }

  // --- gom các khung giờ lại với nhau ---
  get morningSlots() {
    return this.timeSlots.filter(s => parseInt(s.start_time.split(':')[0]) < 12);
  }

  get afternoonSlots() {
    return this.timeSlots.filter(s => {
      const hour = parseInt(s.start_time.split(':')[0]);
      return hour >= 12 && hour < 18;
    });
  }

  get eveningSlots() {
    return this.timeSlots.filter(s => parseInt(s.start_time.split(':')[0]) >= 18);
  }

  // --- Selection Logic ---
  selectCourt(id: string) {
    this.selectedCourtId = id;
  }

  toggleSlot(slot: any) {
    if (!this.selectedCourtId) return;

    const currentCourt = this.courts.find(c => c._id === this.selectedCourtId);
    if (!currentCourt) return;
//  check đã chọn
    const index = this.selectedSlots.findIndex(
      s => s.time_slot_id === slot._id && 
           s.court_id === this.selectedCourtId && 
           s.date === this.selectedDate
    );

    if (index > -1) {
      // Remove it
      this.selectedSlots.splice(index, 1);
    } else {
      // Add it
      this.selectedSlots.push({
        court_id: currentCourt._id,
        court_name: currentCourt.court_name,
        time_slot_id: slot._id,
        start_time: slot.start_time,
        end_time: slot.end_time,
        date: this.selectedDate,
        price: currentCourt.price 
      });
    }
  }

  isSlotSelected(slotId: string): boolean {
    return this.selectedSlots.some(
      s => s.time_slot_id === slotId && 
           s.court_id === this.selectedCourtId && 
           s.date === this.selectedDate
    );
  }

  getTotalSelected(): number {
    return this.selectedSlots.length;
  }

  getTotalPrice(): number {
    return this.selectedSlots.reduce((sum, item) => sum + item.price, 0);
  }

  formatDateDisplay(): string {
    if (!this.selectedDate) return '';
    const d = new Date(this.selectedDate);
    return `Ngày ${d.getDate()} Tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
  }

  // --- UI Helpers ---
  onGalleryScroll(event: Event) {
    const target = event.target as HTMLElement;
    this.activeGalleryIndex = Math.round(target.scrollLeft / target.clientWidth);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
