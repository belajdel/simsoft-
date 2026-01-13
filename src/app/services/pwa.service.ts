import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare let gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class PwaService {
  private platformId = inject(PLATFORM_ID);

  private installPrompt: any = null;
  private isInstallable = false;
  private isInstalled = false;

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializePWA();
    }
  }

  private initializePWA() {
    // Check if PWA is already installed
    if ('standalone' in window.navigator || (window as any).matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
    }

    // Listen for install prompt
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.installPrompt = event;
      this.isInstallable = true;
    });

    // Listen for successful installation
    window.addEventListener('appinstalled', () => {
      this.isInstalled = true;
      this.installPrompt = null;
      this.isInstallable = false;

      // Track PWA installation
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_install', {
          event_category: 'engagement',
          event_label: 'PWA'
        });
      }
    });
  }

  async installPWA(): Promise<{ success: boolean; outcome?: string }> {
    if (!this.installPrompt) {
      return { success: false };
    }

    try {
      this.installPrompt.prompt();
      const { outcome } = await this.installPrompt.userChoice;

      this.installPrompt = null;
      this.isInstallable = false;

      return { success: true, outcome };
    } catch (error) {
      console.error('PWA installation failed:', error);
      return { success: false };
    }
  }

  get isInstallablePWA(): boolean {
    return this.isInstallable;
  }

  get isPWAInstalled(): boolean {
    return this.isInstalled;
  }

  // Update PWA badge (if supported)
  updateBadge(count: number = 0) {
    if ('setAppBadge' in navigator) {
      (navigator as any).setAppBadge(count);
    }
  }

  // Clear PWA badge
  clearBadge() {
    if ('clearAppBadge' in navigator) {
      (navigator as any).clearAppBadge();
    }
  }

  // Request notification permission
  async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    if (Notification.permission === 'granted') {
      return 'granted';
    }

    if (Notification.permission === 'denied') {
      return 'denied';
    }

    const permission = await Notification.requestPermission();
    return permission;
  }

  // Send notification (if permission granted)
  sendNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/Logo.png',
        badge: '/Logo.png',
        ...options
      });
    }
  }
}