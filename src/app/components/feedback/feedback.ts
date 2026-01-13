import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AnalyticsService } from '../../services/analytics.service';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './feedback.html',
  styleUrls: ['./feedback.css']
})
export class FeedbackComponent {
  private analyticsService = inject(AnalyticsService);
  languageService = inject(LanguageService);
  hoveredRating = 0;

  isVisible = signal(false);
  rating = signal(0);
  feedback = signal('');
  isSubmitted = signal(false);
  isSubmitting = signal(false);

  stars = [1, 2, 3, 4, 5];

  // Show feedback widget after 30 seconds or on scroll
  constructor() {
    if (typeof window !== 'undefined') {
      // Show after 30 seconds
      setTimeout(() => {
        if (!this.isSubmitted()) {
          this.showWidget();
        }
      }, 30000);

      // Show on scroll (50% of page)
      const handleScroll = () => {
        const scrolled = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrolled / maxScroll;

        if (scrollPercent > 0.5 && !this.isSubmitted()) {
          this.showWidget();
          window.removeEventListener('scroll', handleScroll);
        }
      };

      window.addEventListener('scroll', handleScroll);
    }
  }

  showWidget() {
    // Only show if not already submitted in this session
    const hasSubmitted = sessionStorage.getItem('feedback_submitted');
    if (!hasSubmitted) {
      this.isVisible.set(true);
    }
  }

  hideWidget() {
    this.isVisible.set(false);
  }

  setRating(value: number) {
    this.rating.set(value);
  }

  submitFeedback() {
    if (this.rating() === 0) return;

    this.isSubmitting.set(true);

    // Track the feedback
    this.analyticsService.trackUserFeedback(
      this.rating(),
      window.location.pathname
    );

    // Simulate API call
    setTimeout(() => {
      this.isSubmitted.set(true);
      this.isSubmitting.set(false);

      // Mark as submitted for this session
      sessionStorage.setItem('feedback_submitted', 'true');

      // Hide widget after 3 seconds
      setTimeout(() => {
        this.hideWidget();
      }, 3000);
    }, 1000);
  }

  getRatingText(): string {
    const rating = this.rating();
    const translations = {
      1: this.languageService.translate('feedback_very_dissatisfied') || 'Very Dissatisfied',
      2: this.languageService.translate('feedback_dissatisfied') || 'Dissatisfied',
      3: this.languageService.translate('feedback_neutral') || 'Neutral',
      4: this.languageService.translate('feedback_satisfied') || 'Satisfied',
      5: this.languageService.translate('feedback_very_satisfied') || 'Very Satisfied'
    };
    return translations[rating as keyof typeof translations] || '';
  }

  getStarEmoji(rating: number, starValue: number): string {
    if (rating >= starValue) {
      return '⭐';
    }
    return '☆';
  }
}