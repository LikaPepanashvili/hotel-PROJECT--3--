import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const STORAGE_KEY = 'userProfile';
const AVATAR_KEY = 'userAvatar';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  form = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    bio: '',
  };

  newPassword = '';
  confirmPassword = '';
  showPass = false;
  showPass2 = false;
  successMsg = '';
  errorMsg = '';

  avatarSrc = 'https://ui-avatars.com/api/?name=User&background=7c5cfc&color=fff&size=140&bold=true';
  hasCustomAvatar = false;
  private originalForm = { ...this.form };

  ngOnInit() {
    // Load saved profile
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { this.form = { ...this.form, ...JSON.parse(saved) }; } catch {}
    } else {
      // Pre-fill phone from login if available
      this.form.phoneNumber = localStorage.getItem('userPhone') || '';
    }

    // Load avatar
    const savedAvatar = localStorage.getItem(AVATAR_KEY);
    if (savedAvatar) {
      this.avatarSrc = savedAvatar;
      this.hasCustomAvatar = true;
    } else {
      this.updateAvatarInitials();
    }

    this.originalForm = { ...this.form };
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      this.errorMsg = 'Image too large. Max size is 5MB.';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      this.avatarSrc = result;
      this.hasCustomAvatar = true;
      localStorage.setItem(AVATAR_KEY, result);
      this.successMsg = 'Profile photo updated!';
      setTimeout(() => this.successMsg = '', 2500);
    };
    reader.readAsDataURL(file);
  }

  removeAvatar() {
    localStorage.removeItem(AVATAR_KEY);
    this.hasCustomAvatar = false;
    this.updateAvatarInitials();
  }

  save() {
    this.errorMsg = '';
    this.successMsg = '';

    if (this.newPassword || this.confirmPassword) {
      if (this.newPassword.length < 6) {
        this.errorMsg = 'Password must be at least 6 characters.';
        return;
      }
      if (this.newPassword !== this.confirmPassword) {
        this.errorMsg = 'Passwords do not match.';
        return;
      }
      // Save password hint (not actual password — no API)
      localStorage.setItem('passwordChanged', 'true');
      this.newPassword = '';
      this.confirmPassword = '';
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.form));

    // Update phone shown in header
    if (this.form.phoneNumber) {
      localStorage.setItem('userPhone', this.form.phoneNumber);
    }

    this.updateAvatarInitials();
    this.originalForm = { ...this.form };
    this.successMsg = '✅ Profile saved successfully!';
    setTimeout(() => this.successMsg = '', 3000);
  }

  resetForm() {
    this.form = { ...this.originalForm };
    this.newPassword = '';
    this.confirmPassword = '';
    this.errorMsg = '';
    this.successMsg = '';
  }

  private updateAvatarInitials() {
    if (this.hasCustomAvatar) return;
    const name = [this.form.firstName, this.form.lastName].filter(Boolean).join('+') || 'User';
    this.avatarSrc = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=7c5cfc&color=fff&size=140&bold=true`;
  }
}
