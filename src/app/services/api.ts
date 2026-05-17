import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Api {
  private authBase = 'https://rentcar.stepprojects.ge/api/Users';
  private hotelBase = 'https://hotelbooking.stepprojects.ge/api';

  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(`${this.authBase}/login`, user);
  }
  register(user: any) {
    return this.http.post(`${this.authBase}/register`, user);
  }
  getAll() {
    return this.http.get(`${this.hotelBase}/Hotels/GetAll`);
  }
  getHotelById(id: number) {
    return this.http.get(`${this.hotelBase}/Hotels/GetHotel/${id}`);
  }
  getRoomById(id: number) {
    return this.http.get(`${this.hotelBase}/Rooms/GetRoom/${id}`);
  }
  bookRoom(room: any) {
    return this.http.post(`${this.hotelBase}/Booking`, room, { responseType: 'text' });
  }
}
