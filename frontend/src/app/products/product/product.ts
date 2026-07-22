import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CurrencyPipe } from '../../pipes/currency-pipe';
import { UpperCasePipe } from '../../pipes/upper-case-pipe';
import { RouterLink } from '@angular/router';
interface IProduct {
  id: Number;
  name: string;
  price: number;
  thumbnail: string;
  inStock: number;
  quantity: number;
  description: string;
}
@Component({
  selector: 'app-product',
  imports: [CommonModule, CurrencyPipe, UpperCasePipe, RouterLink],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  products: IProduct[] = [
    {
      id: 1,
      name: 'Khóa học Angular',
      price: 120000,
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqnULbfbYGEuuC2GVfStMgUM2ivq5REnhLHMnvuLk2Ig&s=10',
      inStock: 5,
      quantity: 0,
      description: 'Học cách xây dựng ứng dụng',
    },
    {
      id: 2,
      name: 'Khóa học Javacripts',
      price: 100000,
      thumbnail:
        'https://images.seeklogo.com/logo-png/33/1/javascript-logo-png_seeklogo-330541.png',
      inStock: 3,
      quantity: 0,
      description: 'Học cách xây dựng ứng dụng',
    },
    {
      id: 3,
      name: 'Khóa học TypeScript',
      price: 140000,
      thumbnail:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/960px-Typescript_logo_2020.svg.png',
      inStock: 7,
      quantity: 0,
      description: 'Học cách xây dựng ứng dụng',
    },
    {
      id: 4,
      name: 'Khóa học ExpressJS',
      price: 140000,
      thumbnail:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvXyqM27GOXG04aEDZ32u_8JSyHNNyv3Yj5UTVO87fxg&s=10',
      inStock: 7,
      quantity: 0,
      description: 'Học cách xây dựng ứng dụng',
    },
  ];
  addToCart(product: IProduct) {
    if (product.inStock > 0) {
      product.inStock--;
      product.quantity++;
    }
  }
}
