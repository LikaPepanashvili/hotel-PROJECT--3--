import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },
  { path: 'register', loadComponent: () => import('./register/register').then(m => m.Register) },
  { path: 'home', loadComponent: () => import('./home/home').then(m => m.Home) },
  { path: 'hotel', loadComponent: () => import('./hotel/hotel').then(m => m.Hotel) },
  { path: 'room', loadComponent: () => import('./rooms/rooms').then(m => m.Rooms) },
  { path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.Profile), canActivate: [authGuard] },
  { path: 'bookedRoom', loadComponent: () => import('./booked-rooms/booked-rooms').then(m => m.BookedRooms), canActivate: [authGuard] },
  { path: 'booking', loadComponent: () => import('./booking/booking').then(m => m.Booking), canActivate: [authGuard] },
  { path: '**', loadComponent: () => import('./error/error').then(m => m.Error) }
];
