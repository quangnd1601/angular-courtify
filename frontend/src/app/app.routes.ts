import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Courts } from './courts/courts';
import { CourtDetail } from './court-detail/court-detail';
import { Checkout } from './checkout/checkout';
import { Login } from './login/login';
import { Register } from './register/register';
import { TestAPI } from './test-api/test-api';
import { CheckoutSuccess } from './checkout-success/checkout-success';
import { BookingHistory } from './booking-history/booking-history';
import { Profile } from './profile/profile';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'courts', component: Courts },
  { path: 'court-detail/:id', component: CourtDetail },
  { path: 'checkout', component: Checkout },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'test-api', component: TestAPI },
  { path: 'checkout-success', component: CheckoutSuccess },
  { path: 'booking-history', component: BookingHistory },
  { path: 'profile', component: Profile }
];

