import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './checkout-success.html',
  styleUrl: './checkout-success.css',
})
export class CheckoutSuccess {
  bookingCode = 'CF' + Math.floor(100000 + Math.random() * 900000);
  todayDate = new Date().toLocaleDateString('vi-VN');
}
