import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AnalyticsService } from './analytics.service';

export interface ABTest {
  id: string;
  name: string;
  variants: ABVariant[];
  isActive: boolean;
  startDate?: Date;
  endDate?: Date;
}

export interface ABVariant {
  id: string;
  name: string;
  weight: number; // 0-100, percentage chance
  component?: any;
  styles?: any;
  content?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ABTestService {
  private platformId = inject(PLATFORM_ID);
  private analyticsService = inject(AnalyticsService);

  private tests: ABTest[] = [
    {
      id: 'hero_cta_button',
      name: 'Hero CTA Button Text',
      isActive: true,
      variants: [
        {
          id: 'discover_solutions',
          name: 'Discover Our Solutions',
          weight: 50,
          content: { buttonText: 'Discover Our Solutions' }
        },
        {
          id: 'get_started',
          name: 'Get Started Today',
          weight: 50,
          content: { buttonText: 'Get Started Today' }
        }
      ]
    },
    {
      id: 'product_card_layout',
      name: 'Product Card Layout',
      isActive: true,
      variants: [
        {
          id: 'standard',
          name: 'Standard Layout',
          weight: 70,
          styles: { layout: 'standard' }
        },
        {
          id: 'compact',
          name: 'Compact Layout',
          weight: 30,
          styles: { layout: 'compact' }
        }
      ]
    }
  ];

  // Get variant for a specific test
  getVariant(testId: string): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null; // Server-side: return null or default
    }

    const test = this.tests.find(t => t.id === testId && t.isActive);
    if (!test) return null;

    // Check if user already has a variant assigned
    const storedVariant = localStorage.getItem(`ab_${testId}`);
    if (storedVariant) {
      return storedVariant;
    }

    // Assign new variant based on weights
    const variant = this.selectVariantByWeight(test.variants);

    // Store the assignment
    localStorage.setItem(`ab_${testId}`, variant.id);

    // Track the assignment
    this.analyticsService.trackEvent('ab_test_assignment', {
      test_id: testId,
      test_name: test.name,
      variant_id: variant.id,
      variant_name: variant.name
    });

    return variant.id;
  }

  // Get variant content for a test
  getVariantContent(testId: string): any {
    const variantId = this.getVariant(testId);
    if (!variantId) return null;

    const test = this.tests.find(t => t.id === testId);
    if (!test) return null;

    const variant = test.variants.find(v => v.id === variantId);
    return variant?.content || null;
  }

  // Track conversion for A/B test
  trackConversion(testId: string, goal: string, value?: number) {
    const variantId = this.getVariant(testId);
    if (!variantId) return;

    const test = this.tests.find(t => t.id === testId);
    if (!test) return;

    this.analyticsService.trackEvent('ab_test_conversion', {
      test_id: testId,
      test_name: test.name,
      variant_id: variantId,
      goal: goal,
      value: value
    });
  }

  // Reset test assignment (for development/testing)
  resetTest(testId: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(`ab_${testId}`);
    }
  }

  // Get test results (simplified - in real app, this would fetch from analytics)
  getTestResults(testId: string): any {
    // This would typically fetch data from your analytics platform
    // For now, return mock data
    return {
      testId,
      variants: [
        { id: 'variant_a', conversions: 45, visitors: 200 },
        { id: 'variant_b', conversions: 52, visitors: 198 }
      ]
    };
  }

  private selectVariantByWeight(variants: ABVariant[]): ABVariant {
    const totalWeight = variants.reduce((sum, variant) => sum + variant.weight, 0);
    let random = Math.random() * totalWeight;

    for (const variant of variants) {
      random -= variant.weight;
      if (random <= 0) {
        return variant;
      }
    }

    // Fallback to first variant
    return variants[0];
  }

  // Get all active tests
  getActiveTests(): ABTest[] {
    return this.tests.filter(test => test.isActive);
  }

  // Add a new test (admin function)
  addTest(test: ABTest) {
    // Validate test
    if (!test.id || !test.variants.length) {
      throw new Error('Invalid test configuration');
    }

    // Check weight sum
    const totalWeight = test.variants.reduce((sum, v) => sum + v.weight, 0);
    if (totalWeight !== 100) {
      throw new Error('Variant weights must sum to 100');
    }

    this.tests.push(test);
  }

  // Remove a test
  removeTest(testId: string) {
    this.tests = this.tests.filter(test => test.id !== testId);
  }
}