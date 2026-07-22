import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-details',
  imports: [],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  id = '';
  constructor(route: ActivatedRoute) {
    this.id = String(route.snapshot.paramMap.get('id'));
  }
}
