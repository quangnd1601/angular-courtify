import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { CommonModule } from '@angular/common';
import { ApiResponse } from '../interfaces/api-response';
import { Sport } from '../interfaces/sport';
import { TestSportCenterCard } from '../components/test-sport-center-card/test-sport-center-card';
import {signal}  from '@angular/core';
@Component({
  selector: 'app-test-api',
  imports: [CommonModule,TestSportCenterCard],
  templateUrl: './test-api.html',
  styleUrl: './test-api.css',
})
export class TestAPI  implements OnInit{
  sports = signal<Sport[]>([]); 
  constructor(private http: HttpClient){}
  ngOnInit  (): void {
    this.http.get<ApiResponse<Sport[]>>(`${environment.API_BACKEND}/sports`).subscribe({
      next: (res) => {
        console.log(">>> Lấy dữ liệu thành công:" , res.data)
        this.sports.set(res.data); 
      },
      error: (err) => {
        console.log("Lỗi API rồi:", err);
      }
    })
  }
}
