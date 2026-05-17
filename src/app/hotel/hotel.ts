import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Hotelobj } from '../models/hotel';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel',
  imports: [RouterModule, CommonModule],
  templateUrl: './hotel.html',
  styleUrl: './hotel.scss',
})
export class Hotel {
  hotelArr: Hotelobj[] = [];
  filteredHotels: Hotelobj[] = [];
  cities: string[] = [];
  selectedCity = '';
  loading = true;

  constructor(private api: Api, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.getAll().subscribe({
      next: (res: any) => {
        this.hotelArr = res;
        this.filteredHotels = res;
        this.cities = [...new Set<string>(res.map((h: Hotelobj) => h.city))].sort();
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  filterCity(city: string) {
    this.selectedCity = city;
    this.filteredHotels = city ? this.hotelArr.filter(h => h.city === city) : this.hotelArr;
  }

  onImgErr(e: Event) {
    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=70';
  }
}
