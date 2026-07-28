import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Booking {
  id: string;
  sportCenterName: string;
  courtName: string;
  sportType: string;
  bookingDate: string;
  timeSlot: string;
  totalPrice: string;
  status: 'UPCOMING' | 'COMPLETED' | 'CANCELLED';
  statusText: string;
  code: string;
  image: string;
}

@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './booking-history.html',
  styleUrl: './booking-history.css'
})
export class BookingHistory implements OnInit {
  currentTab: 'ALL' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED' = 'ALL';

  bookings: Booking[] = [
    {
      id: '1',
      sportCenterName: 'Olympic Arena & Club',
      courtName: 'Sân Pickleball VIP 1',
      sportType: 'Pickleball',
      bookingDate: '30/07/2026',
      timeSlot: '17:00 - 19:00',
      totalPrice: '240.000đ',
      status: 'UPCOMING',
      statusText: 'Sắp diễn ra',
      code: 'CTF-99281',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: '2',
      sportCenterName: 'Sân Bóng Đá Mini 362',
      courtName: 'Sân bóng 7 người - Sân B',
      sportType: 'Bóng đá',
      bookingDate: '28/07/2026',
      timeSlot: '19:00 - 20:30',
      totalPrice: '450.000đ',
      status: 'UPCOMING',
      statusText: 'Sắp diễn ra',
      code: 'CTF-88371',
      image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: '3',
      sportCenterName: 'Hồ Bơi Vô Cực Horizon',
      courtName: 'Làn bơi số 3',
      sportType: 'Bơi lội',
      bookingDate: '22/07/2026',
      timeSlot: '08:00 - 10:00',
      totalPrice: '120.000đ',
      status: 'COMPLETED',
      statusText: 'Đã hoàn thành',
      code: 'CTF-44102',
      image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: '4',
      sportCenterName: 'CLB Cầu Lông Ngôi Sao',
      courtName: 'Sân cầu lông số 5',
      sportType: 'Cầu lông',
      bookingDate: '15/07/2026',
      timeSlot: '18:00 - 20:00',
      totalPrice: '160.000đ',
      status: 'COMPLETED',
      statusText: 'Đã hoàn thành',
      code: 'CTF-33291',
      image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=200&auto=format&fit=crop'
    },
    {
      id: '5',
      sportCenterName: 'Victory Tennis Court',
      courtName: 'Sân Tennis tiêu chuẩn - Sân 2',
      sportType: 'Tennis',
      bookingDate: '10/07/2026',
      timeSlot: '16:00 - 18:00',
      totalPrice: '300.000đ',
      status: 'CANCELLED',
      statusText: 'Đã hủy',
      code: 'CTF-22180',
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=200&auto=format&fit=crop'
    }
  ];

  filteredBookings: Booking[] = [];

  ngOnInit(): void {
    this.filterBookings();
  }

  setTab(tab: 'ALL' | 'UPCOMING' | 'COMPLETED' | 'CANCELLED') {
    this.currentTab = tab;
    this.filterBookings();
  }

  filterBookings() {
    if (this.currentTab === 'ALL') {
      this.filteredBookings = this.bookings;
    } else {
      this.filteredBookings = this.bookings.filter(b => b.status === this.currentTab);
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'UPCOMING':
        return 'bg-blue-50 text-blue-600 border border-blue-100';
      case 'COMPLETED':
        return 'bg-emerald-50 text-emerald-600 border border-emerald-100';
      case 'CANCELLED':
        return 'bg-rose-50 text-rose-600 border border-rose-100';
      default:
        return 'bg-slate-50 text-slate-600 border border-slate-100';
    }
  }

  getSportIcon(sportType: string): string {
    const name = sportType.toLowerCase();
    if (name.includes('bóng đá') || name.includes('soccer')) return 'sports_soccer';
    if (name.includes('bóng rổ') || name.includes('basketball')) return 'sports_basketball';
    if (name.includes('tennis')) return 'sports_tennis';
    if (name.includes('cầu lông') || name.includes('badminton')) return 'sports_handball';
    if (name.includes('bơi')) return 'pool';
    if (name.includes('pickleball')) return 'sports_tennis';
    return 'sports_score';
  }
}
