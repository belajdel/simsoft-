import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);

  private currentTheme = signal<Theme>('light');

  readonly theme = this.currentTheme.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      // Load theme from localStorage or default to light theme
      const savedTheme = localStorage.getItem('theme') as Theme;
      const initialTheme = savedTheme || 'light';

      this.setTheme(initialTheme);
    } else {
      // Server-side: default to light theme
      this.currentTheme.set('light');
    }
  }

  setTheme(theme: Theme) {
    this.currentTheme.set(theme);

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
      this.applyTheme(theme);
    }
  }

  toggleTheme() {
    const newTheme = this.currentTheme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  private applyTheme(theme: Theme) {
    const root = this.document.documentElement;

    // Remove both theme classes first
    root.classList.remove('dark-theme', 'light-theme');

    // Add the appropriate theme class
    if (theme === 'dark') {
      root.classList.add('dark-theme');
    } else {
      root.classList.add('light-theme');
    }
  }
}