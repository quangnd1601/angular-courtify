import { Routes } from '@angular/router';
import { About } from './about/about/about';
import { Home } from './home/home/home';
import { Product } from './products/product/product';
import { ProductDetails } from './products/product-details/product-details';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  { path: 'about', component: About },
  { path: 'products', component: Product },
  { path: 'product-detail/:id/:price', component: ProductDetails },
];
