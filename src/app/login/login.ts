import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Api } from '../services/api';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  showPass = false;
  loading = false;
  errorMsg = '';

  constructor(private api: Api, private router: Router) {}

  login(loginForm: any) {
    if (!loginForm.valid) { this.errorMsg = 'Please fill in all fields.'; return; }
    this.loading = true; this.errorMsg = '';
    this.api.login(loginForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userPhone', loginForm.value.phoneNumber);
        this.router.navigateByUrl('/home');
      },
      error: (er) => {
        this.errorMsg = 'Invalid credentials. Please try again.';
        this.loading = false;
      }
    });
  }
}
