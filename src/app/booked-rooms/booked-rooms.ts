import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-booked-rooms',
  imports: [CommonModule, RouterModule],
  templateUrl: './booked-rooms.html',
  styleUrl: './booked-rooms.scss',
})
export class BookedRooms {
  bookid = '';
  bookMsg = '';
  ngOnInit() {
    this.bookid = localStorage.getItem('bookingId') || '';
    this.bookMsg = localStorage.getItem('bookingMsg') || '';
  }
}
