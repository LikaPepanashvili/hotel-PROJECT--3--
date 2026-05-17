import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';
import { Hotelobj } from '../models/hotel';

@Component({
  selector: 'app-home',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  hotels: Hotelobj[] = [];
  displayedHotels: Hotelobj[] = [];
  cities: string[] = [];
  loading = true;

  searchQ = '';
  selectedCity = '';
  selectedPrice = '';
  selectedGuests = '2';

  usps = [
    { icon: '🍹', title: 'Beverages Included', desc: 'Enjoy free drinks throughout your stay.' },
    { icon: '💳', title: 'Stay First, Pay After', desc: 'Book your room and pay only after checkout.' },
    { icon: '🍽️', title: '24 Hour Restaurant', desc: 'Our restaurants are open around the clock.' },
    { icon: '🧖', title: 'Spa Included', desc: 'Relax with our world-class spa facilities.' },
  ];

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getAll().subscribe({
      next: (res: any) => {
        this.hotels = res;
        this.displayedHotels = res.slice(0, 6);
        this.cities = [...new Set<string>(res.map((h: Hotelobj) => h.city))].sort();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  goSearch() {
    let results = [...this.hotels];
    if (this.selectedCity) results = results.filter(h => h.city === this.selectedCity);
    if (this.searchQ.trim()) {
      const q = this.searchQ.toLowerCase();
      results = results.filter(h => h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q));
    }
    this.displayedHotels = results;
    this.cdr.detectChanges();
  }

  onImgErr(e: Event) {
    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=70';
  }
}
