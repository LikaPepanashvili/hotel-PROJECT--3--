import { Component } from '@angular/core';
import { Api } from '../services/api';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  showPass = false;
  loading = false;
  errorMsg = '';
  successMsg = '';
  apiError = '';

  constructor(private api: Api, private router: Router) {}

  register(registerForm: any) {
    if (!registerForm.valid) { this.errorMsg = 'Please fill in all fields.'; return; }
    this.loading = true; this.errorMsg = ''; this.apiError = '';

    const payload = {
      ...registerForm.value,
      role: 'User'
    };

    this.api.register(payload).subscribe({
      next: (res: any) => {
        this.successMsg = '✅ Account created! Redirecting to login...';
        setTimeout(() => this.router.navigateByUrl('/login'), 1500);
      },
      error: (er) => {
        this.loading = false;
        if (er.error) {
          if (er.error.errors) {
            const msgs: string[] = [];
            Object.values(er.error.errors).forEach((v: any) => msgs.push(...v));
            this.apiError = msgs.join(' | ');
          } else if (typeof er.error === 'string') {
            this.apiError = er.error;
          } else {
            this.apiError = JSON.stringify(er.error);
          }
        } else {
          this.errorMsg = `Error ${er.status}: ${er.message}`;
        }
      }
    });
  }
}
