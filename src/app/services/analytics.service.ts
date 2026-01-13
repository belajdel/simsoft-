import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare let gtag: Function;

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, any>;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAnalytics();
      this.trackPageViews();
    }
  }

  private initializeAnalytics() {
    // Google Analytics 4 initialization
    // In a real app, you'd load the GA script dynamically
    if (typeof gtag !== 'undefined') {
      gtag('config', 'GA_MEASUREMENT_ID', {
        page_title: document.title,
        page_location: window.location.href
      });
    }
  }

  private trackPageViews() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.trackEvent('page_view', {
          page_path: event.urlAfterRedirects,
          page_title: document.title
        });
      });
  }

  trackEvent(action: string, parameters: Record<string, any> = {}) {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      if (typeof gtag !== 'undefined') {
        gtag('event', action, parameters);
      }

      // Also log to console in development
      if (this.isDevelopment()) {
        console.log('Analytics Event:', { action, ...parameters });
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  trackProductView(productId: string, productName?: string) {
    this.trackEvent('view_product', {
      product_id: productId,
      product_name: productName,
      category: 'product'
    });
  }

  trackSearch(query: string, resultsCount: number) {
    this.trackEvent('search', {
      search_term: query,
      results_count: resultsCount,
      category: 'search'
    });
  }

  trackContactFormSubmission(success: boolean) {
    this.trackEvent('contact_form_submit', {
      success: success,
      category: 'contact'
    });
  }

  trackLanguageSwitch(from: string, to: string) {
    this.trackEvent('language_switch', {
      from_language: from,
      to_language: to,
      category: 'language'
    });
  }

  trackThemeSwitch(from: string, to: string) {
    this.trackEvent('theme_switch', {
      from_theme: from,
      to_theme: to,
      category: 'theme'
    });
  }

  trackBlogPostView(postId: string, postTitle: string) {
    this.trackEvent('view_blog_post', {
      post_id: postId,
      post_title: postTitle,
      category: 'blog'
    });
  }

  trackUserFeedback(rating: number, page: string) {
    this.trackEvent('user_feedback', {
      rating: rating,
      page: page,
      category: 'feedback'
    });
  }

  trackOutboundLink(url: string, linkText?: string) {
    this.trackEvent('click_external_link', {
      url: url,
      link_text: linkText,
      category: 'external'
    });
  }

  trackDownload(fileName: string, fileType: string) {
    this.trackEvent('file_download', {
      file_name: fileName,
      file_type: fileType,
      category: 'download'
    });
  }

  trackError(errorType: string, errorMessage: string, page?: string) {
    this.trackEvent('javascript_error', {
      error_type: errorType,
      error_message: errorMessage,
      page: page || window.location.pathname,
      category: 'error'
    });
  }

  trackPerformance(metric: string, value: number) {
    this.trackEvent('performance_metric', {
      metric: metric,
      value: value,
      category: 'performance'
    });
  }

  private isDevelopment(): boolean {
    return typeof window !== 'undefined' && window.location.hostname === 'localhost';
  }
}
