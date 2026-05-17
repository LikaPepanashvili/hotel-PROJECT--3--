import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from '../services/api';
import { Room } from '../models/hotel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.html',
  styleUrl: './booking.scss',
})
export class Booking {
  room: Room = new Room();
  roomId: number = 0;
  activeImg = 0;
  submitting = false;
  errorMsg = '';
  successMsg = '';
  today = new Date().toISOString().split('T')[0];

  constructor(private router: ActivatedRoute, private cdr: ChangeDetectorRef, private api: Api) {
    this.router.queryParams.subscribe(data => { this.roomId = data['id']; });
  }

  ngOnInit() {
    this.api.getRoomById(this.roomId).subscribe({
      next: (res: any) => {
        this.room = res;
        this.cdr.detectChanges();
      },
      error: (er) => { this.errorMsg = 'Room not found.'; }
    });
  }

  book(form: any) {
    if (!form.valid) { this.errorMsg = 'Please fill in all fields.'; return; }
    this.submitting = true; this.errorMsg = '';
    const obj = {
      roomID: this.roomId,
      totalPrice: this.room.pricePerNight * 1,
      isConfirmed: true,
      ...form.value
    };
    this.api.bookRoom(obj).subscribe({
      next: (resp: any) => {
        this.successMsg = '✅ ' + resp;
        localStorage.setItem('bookingId', resp.split(' ')[5] || '');
        localStorage.setItem('bookingMsg', resp);
        this.submitting = false;
        this.cdr.detectChanges();
      },
      error: (er) => {
        this.errorMsg = 'Booking failed. Please try again.';
        this.submitting = false;
        this.cdr.detectChanges();
      }
    });
  }

  onImgErr(e: Event) { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=70'; }
}
