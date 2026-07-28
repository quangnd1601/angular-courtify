import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SportCenterCard } from '../components/sport-center-card/sport-center-card';
import { SportCenter } from '../interfaces/sport-center';
import { Sport } from '../interfaces/sport';
import { ApiResponse } from '../interfaces/api-response';

@Component({
  standalone: true,
  selector: 'app-courts',
  imports: [CommonModule, FormsModule, RouterLink, SportCenterCard],
  templateUrl: './courts.html',
  styleUrls: ['./courts.css']
})
export class Courts implements OnInit, OnDestroy {
  sports = signal<Sport[]>([]);
  centers = signal<SportCenter[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  searchQuery = '';
  selectedSportId = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating = 0;
  sortBy = 'bookings_desc';
  showFilterPanel = false;

  private searchSubject = new Subject<string>();
  private subscription = new Subscription();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchSports();
    this.fetchCenters();

    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe(query => {
        this.searchQuery = query;
        this.fetchCenters();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onSearchChange(query: string) {
    this.searchSubject.next(query);
  }

  fetchSports() {
    this.http.get<ApiResponse<Sport[]>>('http://localhost:8000/api/sports').subscribe({
      next: (res) => {
        if (res?.success) this.sports.set(res.data || []);
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách môn thể thao:', err);
        this.sports.set([]);
      }
    });
  }

  fetchCenters() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    let params = new HttpParams();
    if (this.searchQuery && this.searchQuery.trim()) {
      params = params.set('search', this.searchQuery.trim());
    }
    if (this.selectedSportId) {
      params = params.set('sport_id', this.selectedSportId);
    }
    if (this.minRating > 0) {
      params = params.set('min_rating', this.minRating.toString());
    }
    if (this.sortBy) {
      params = params.set('sort', this.sortBy);
    }

    this.http.get<ApiResponse<SportCenter[]>>('http://localhost:8000/api/sport-centers', { params }).subscribe({
      next: (res) => {
        this.centers.set(res?.success ? res.data || [] : []);
        if (!res?.success) {
          this.errorMessage.set('Không thể tải danh sách sân. Vui lòng thử lại sau.');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Lỗi lấy danh sách sân:', err);
        this.errorMessage.set('Lỗi kết nối với máy chủ. Vui lòng thử lại.');
        this.centers.set([]);
        this.isLoading.set(false);
      }
    });
  }

  selectSport(id: string) {
    this.selectedSportId = id;
    this.fetchCenters();
  }

  toggleFilterPanel() {
    this.showFilterPanel = !this.showFilterPanel;
  }

  applyFilters() {
    this.showFilterPanel = false;
    this.fetchCenters();
  }

  resetFilters() {
    this.searchQuery = '';
    this.selectedSportId = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.minRating = 0;
    this.sortBy = 'bookings_desc';
    this.fetchCenters();
  }

  getSortLabel(): string {
    switch(this.sortBy) {
      case 'price_asc': return 'Giá thấp đến cao';
      case 'price_desc': return 'Giá cao đến thấp';
      case 'rating_desc': return 'Đánh giá cao';
      case 'newest': return 'Mới nhất';
      default: return 'Phổ biến nhất';
    }
  }

  trackById(index: number, item: { _id: string }) {
    return item?._id || index;
  }
}
