import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sport } from '../interfaces/sport';
import { SportCenter } from '../interfaces/sport-center';
import { ApiResponse } from '../interfaces/api-response';
import { Voucher } from '../interfaces/voucher';
import { SportCenterCard } from '../components/sport-center-card/sport-center-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CommonModule, SportCenterCard],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  sports: Sport[] = [];
  popularCenters: SportCenter[] = [];
  trendingCenters: SportCenter[] = [];
  topRatedCenters: SportCenter[] = [];

  vouchers: Voucher[] = [];
  reviews: any[] = [];
  news: any[] = [];

  showScrollTop = false;
  fabWidth = '480px';
  fabLeft = '50%';
  fabTransform = 'translateX(-50%)';

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.adjustFabContainer();

    // Fetch Sports
    this.http.get<ApiResponse<Sport[]>>("http://localhost:8000/api/sports").subscribe({
      next: (res) => {
        if (res && res.success) {
          this.sports = res.data;
        }
      },
      error: (err) => console.error(">>> API sports error:", err)
    });

    // Fetch Sport Centers
    this.http.get<ApiResponse<SportCenter[]>>("http://localhost:8000/api/sport-centers").subscribe({
      next: (res) => {
        if (res && res.success) {
          const allCenters = res.data;

          // Sân phổ biến 
          this.popularCenters = [...allCenters].sort((a, b) => b.total_bookings - a.total_bookings).slice(0, 5);

          // Sân hot trending 
          this.trendingCenters = [...allCenters].sort((a, b) => b.total_views - a.total_views).slice(0, 5);

          // Sân đánh giá tốt
          this.topRatedCenters = [...allCenters].sort((a, b) => b.average_rating - a.average_rating).slice(0, 5);
        }
      },
      error: (err) => console.error(">>> API sport-centers error:", err)
    });

    // Fetch Vouchers (Khuyến mãi)
    this.http.get<ApiResponse<Voucher[]>>("http://localhost:8000/api/vouchers").subscribe({
      next: (res) => {
        if (res && res.success) {
          this.vouchers = res.data.filter(v => v.status === 'ACTIVE');
        }
      },
      error: (err) => console.error(">>> API vouchers error:", err)
    });

    //  data Tin tức
    this.news = [
      { _id: '1', title: 'Courtify ra mắt tính năng đặt sân tự động qua AI cực nhanh', date: '20/07/2026', thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=200&auto=format&fit=crop' },
      { _id: '2', title: 'Top 5 sân Pickleball chất lượng tốt nhất đang hot tại TP.HCM', date: '18/07/2026', thumbnail: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=200&auto=format&fit=crop' },
      { _id: '3', title: 'Giải bóng đá phong trào các CLB Courtify chính thức khởi tranh', date: '15/07/2026', thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=200&auto=format&fit=crop' }
    ];

    // đánh giá
    this.http.get<ApiResponse<any[]>>("http://localhost:8000/api/reviews").subscribe({
      next: (res) => {
        if (res && res.success) {
          this.reviews = res.data.map(r => ({
            _id: r._id,
            user_name: r.user_id?.name || 'Người dùng ẩn danh',
            user_avatar: r.user_id?.avatar_url,
            rating: r.rating,
            comment: r.comment,
            center_name: r.sport_center_id?.name || ''
          })).slice(0, 3);
        }
      },
      error: (err) => console.error(">>> API reviews error:", err)
    });
  }

  getSportIcon(sportName: string): string {
    const name = sportName.toLowerCase();
    if (name.includes('bóng đá') || name.includes('soccer') || name.includes('football')) return 'sports_soccer';
    if (name.includes('bóng rổ') || name.includes('basketball')) return 'sports_basketball';
    if (name.includes('tennis') || name.includes('quần vợt')) return 'sports_tennis';
    if (name.includes('cầu lông') || name.includes('badminton')) return 'sports_handball';
    if (name.includes('bóng bàn')) return 'sports_tennis';
    if (name.includes('bơi')) return 'pool';
    if (name.includes('pickleball')) return 'sports_tennis';
    return 'sports_score';
  }

  getSportImage(sportName: string): string {
    const name = sportName.toLowerCase();
    if (name.includes('cầu lông') || name.includes('badminton')) return 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=200&auto=format&fit=crop';
    if (name.includes('tennis') || name.includes('quần vợt')) return 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?q=80&w=200&auto=format&fit=crop';
    if (name.includes('pickleball')) return 'https://images.unsplash.com/photo-1612534847738-b3af9bc31f0c?q=80&w=200&auto=format&fit=crop';
    if (name.includes('bóng đá') || name.includes('soccer')) return 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=200&auto=format&fit=crop';
    if (name.includes('bóng rổ') || name.includes('basketball')) return 'https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=200&auto=format&fit=crop';
    if (name.includes('bơi')) return 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=200&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=200&auto=format&fit=crop';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollTop = window.scrollY > 300;
  }

  @HostListener('window:resize', [])
  onResize() {
    this.adjustFabContainer();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private adjustFabContainer() {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < 480) {
      this.fabWidth = '100%';
      this.fabLeft = '0';
      this.fabTransform = 'none';
    } else {
      this.fabWidth = '480px';
      this.fabLeft = '50%';
      this.fabTransform = 'translateX(-50%)';
    }
  }
}
