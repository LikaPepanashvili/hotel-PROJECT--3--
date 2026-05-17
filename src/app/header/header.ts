import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private router: Router) {}

  isLoggedIn(): boolean { return !!localStorage.getItem('token'); }

  getDisplayName(): string {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
      try {
        const p = JSON.parse(saved);
        if (p.firstName || p.lastName) return [p.firstName, p.lastName].filter(Boolean).join(' ');
        if (p.phoneNumber) return p.phoneNumber;
      } catch {}
    }
    return localStorage.getItem('userPhone') || 'Profile';
  }

  getAvatar(): string {
    const saved = localStorage.getItem('userAvatar');
    if (saved) return saved;
    const name = this.getDisplayName();
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c5cfc&color=fff&size=40&bold=true`;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userPhone');
    this.router.navigate(['/home']);
  }
}
