import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  paymentMethod: 'bank' | 'cash' = 'bank';
  
  // Hardcoded details for the bank transfer
  bankName = 'Vietcombank (VCB)';
  accountNumber = '1029485763';
  accountName = 'CONG TY TNHH COURTIFY VIETNAM';
  transferSyntax = 'CTFY' + Math.floor(100000 + Math.random() * 900000);
}
