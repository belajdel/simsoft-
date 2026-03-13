import { Component, inject, signal, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css']
})
export class Admin implements OnInit {
  private http = inject(HttpClient);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  isLoggedIn = signal(false);

  email = '';
  password = '';
  loginError = '';
  
  toastMessage = signal<string | null>(null);

  activeTab: 'general' | 'blog' = 'general';

  content: any = {
    hero: { title: '', subtitle: '' },
    about: { description: '' },
    contactEmail: ''
  };

  blogPosts: any[] = [];
  editingPost: any = null;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        this.isLoggedIn.set(true);
        this.loadContent();
        this.loadArticles();
      }
    }
  }

  ngOnInit() {
  }

  private getHeaders() {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  login() {
    this.http.post<any>('http://localhost:5000/api/auth/login', {
      email: this.email,
      password: this.password
    }).subscribe({
      next: (res) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('token', res.data.token);
        }
        this.isLoggedIn.set(true);
        this.loadContent();
        this.loadArticles();
        this.loginError = '';
      },
      error: (err) => {
        this.loginError = 'Invalid credentials. Please check your email and password.';
      }
    });
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
    }
    this.isLoggedIn.set(false);
    this.email = '';
    this.password = '';
  }

  loadContent() {
    this.http.get<any>('http://localhost:5000/api/content').subscribe({
      next: (data) => {
        this.content = data;
      },
      error: () => {
        console.warn('Backend content endpoint unavailable, using mocked content data for UI preview.');
      }
    });
  }

  saveContent() {
    this.http.post('http://localhost:5000/api/content', this.content, { headers: this.getHeaders() }).subscribe({
      next: () => this.showToast('Content updated successfully!'),
      error: () => this.showToast('Error updating content')
    });
  }

  private showToast(message: string) {
    this.toastMessage.set(message);
    setTimeout(() => {
      this.toastMessage.set(null);
    }, 3000);
  }

  loadArticles() {
    this.http.get<any>('http://localhost:5000/api/articles?limit=50').subscribe({
      next: (res) => {
        this.blogPosts = res.data.articles || [];
      },
      error: () => console.warn('Failed to load articles.')
    });
  }

  createNewPost() {
    this.editingPost = {
      title: '',
      excerpt: '',
      content: '',
      author: 'Admin',
      imageUrl: '',
      tags: [],
      isPublished: true
    };
  }

  updateTags(tagsString: string) {
    if (this.editingPost) {
      this.editingPost.tags = tagsString.split(',').map(t => t.trim()).filter(t => t.length > 0);
    }
  }

  editPost(post: any) {
    this.editingPost = JSON.parse(JSON.stringify(post)); // deep copy
  }

  cancelEdit() {
    this.editingPost = null;
  }

  savePost() {
    if (!this.editingPost) return;

    const id = this.editingPost._id || this.editingPost.id;
    
    if (id) {
        // Update existing
        this.http.put(`http://localhost:5000/api/articles/${id}`, this.editingPost, { headers: this.getHeaders() }).subscribe({
            next: () => {
                this.showToast('Post updated successfully!');
                this.loadArticles();
                this.editingPost = null;
            },
            error: () => this.showToast('Error updating post')
        });
    } else {
        // Create new
        this.http.post('http://localhost:5000/api/articles', this.editingPost, { headers: this.getHeaders() }).subscribe({
            next: () => {
                this.showToast('Post created successfully!');
                this.loadArticles();
                this.editingPost = null;
            },
            error: () => this.showToast('Error creating post')
        });
    }
  }

  deletePost(id: string) {
    if (confirm('Are you sure you want to delete this post?')) {
        this.http.delete(`http://localhost:5000/api/articles/${id}`, { headers: this.getHeaders() }).subscribe({
            next: () => {
                this.showToast('Post deleted successfully!');
                this.loadArticles();
            },
            error: () => this.showToast('Error deleting post')
        });
    }
  }
}
