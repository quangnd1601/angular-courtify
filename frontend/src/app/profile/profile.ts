import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  gender: 'Nam' | 'Nữ';
  birthday: string;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {
  user: UserProfile = {
    name: 'Nguyễn Duy Quang',
    email: 'quang@gmail.com',
    phone: '0901234567',
    avatar_url: '',
    gender: 'Nam',
    birthday: '2010-05-15'
  };

  isEditing = false;
  showSaveSuccess = false;
  selectedFile: string | ArrayBuffer | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    const localUserStr = localStorage.getItem('user');
    if (localUserStr) {
      try {
        const parsed = JSON.parse(localUserStr);
        this.user = {
          name: parsed.name || this.user.name,
          email: parsed.email || this.user.email,
          phone: parsed.phone || this.user.phone,
          avatar_url: parsed.avatar_url || this.user.avatar_url,
          gender: parsed.gender || this.user.gender,
          birthday: parsed.birthday || this.user.birthday
        };
      } catch (e) {
        console.error('Error parsing local storage user:', e);
      }
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.user.avatar_url = e.target.result as string;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    localStorage.setItem('user', JSON.stringify({
      ...this.user
    }));

    this.isEditing = false;
    this.showSaveSuccess = true;

    setTimeout(() => {
      this.showSaveSuccess = false;
    }, 3000);
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
