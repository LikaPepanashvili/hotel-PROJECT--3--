import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { Hotelobj, Room } from '../models/hotel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './rooms.html',
  styleUrl: './rooms.scss',
})
export class Rooms {
  hotel: Hotelobj = new Hotelobj();
  allRooms: Room[] = [];
  filteredRooms: Room[] = [];
  roomTypes: string[] = [];
  loading = true;

  selectedType = '';
  maxPrice = 1000;
  checkIn = '';
  checkOut = '';
  guests = 2;
  today = new Date().toISOString().split('T')[0];
  selectedId: number = 0;

  constructor(private router: ActivatedRoute, private api: Api, private cdr: ChangeDetectorRef) {
    this.router.queryParams.subscribe(data => { this.selectedId = data['id']; });
  }

  ngOnInit() {
    this.api.getHotelById(this.selectedId).subscribe({
      next: (res: any) => {
        this.hotel = res;
        this.allRooms = res.rooms || [];
        this.filteredRooms = [...this.allRooms];
        const types = new Set<string>();
        this.allRooms.forEach((r: Room) => {
          const n = r.name.toLowerCase();
          if (n.includes('single')) types.add('Single Room');
          else if (n.includes('double')) types.add('Double Room');
          else if (n.includes('deluxe')) types.add('Deluxe Room');
          else if (n.includes('suite')) types.add('Suite');
          else if (n.includes('twin')) types.add('Twin Room');
          else if (n.includes('premium')) types.add('Premium Room');
          else if (n.includes('club')) types.add('Club Room');
          else types.add(r.name);
        });
        this.roomTypes = [...types];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => { this.loading = false; }
    });
  }

  setType(t: string) { this.selectedType = t; this.applyFilters(); }

  applyFilters() {
    let results = [...this.allRooms];
    if (this.selectedType) {
      results = results.filter(r => r.name.toLowerCase().includes(
        this.selectedType.toLowerCase().replace(' room','').replace(' suite','')
      ));
    }
    results = results.filter(r => r.pricePerNight <= this.maxPrice);
    if (this.guests > 1) results = results.filter(r => r.maximumGuests >= this.guests);
    this.filteredRooms = results;
    this.cdr.detectChanges();
  }

  resetFilters() {
    this.selectedType = ''; this.maxPrice = 1000;
    this.checkIn = ''; this.checkOut = ''; this.guests = 2;
    this.filteredRooms = [...this.allRooms];
    this.cdr.detectChanges();
  }

  changeGuests(d: number) { this.guests = Math.max(1, Math.min(10, this.guests + d)); this.applyFilters(); }

  getNights(): number {
    if (!this.checkIn || !this.checkOut) return 0;
    return Math.max(0, Math.round((new Date(this.checkOut).getTime() - new Date(this.checkIn).getTime()) / 86400000));
  }

  onImgErr(e: Event) { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=70'; }
}
