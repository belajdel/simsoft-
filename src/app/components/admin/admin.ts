import { Component, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isLoggedIn = signal(false);

  username = '';
  password = '';
  loginError = '';

  content: any = {
    hero: { title: '', subtitle: '' },
    about: { description: '' },
    contactEmail: ''
  };

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn.set(true);
        this.loadContent();
      }
    }
  }

  login() {
    this.http.post<any>('http://localhost:3000/api/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.accessToken);
        }
        this.isLoggedIn.set(true);
        this.loadContent();
      },
      error: (err) => {
        this.loginError = 'Invalid credentials';
      }
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.isLoggedIn.set(false);
    this.username = '';
    this.password = '';
  }

  loadContent() {
    this.http.get<any>('http://localhost:3000/api/content').subscribe(data => {
      this.content = data;
    });
  }

  saveContent() {
    this.http.post('http://localhost:3000/api/content', this.content).subscribe({
      next: () => alert('Content updated successfully!'),
      error: () => alert('Error updating content')
    });
  }
}
