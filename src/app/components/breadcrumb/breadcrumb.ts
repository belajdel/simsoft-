import { Component, Input, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { LanguageService } from '../../services/language.service';

export interface BreadcrumbItem {
  label: string;
  url?: string;
  isActive?: boolean;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrls: ['./breadcrumb.css']
})
export class BreadcrumbComponent {
  @Input() customItems?: BreadcrumbItem[];

  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private location = inject(Location);
  private languageService = inject(LanguageService);

  breadcrumbs = computed(() => {
    if (this.customItems) {
      return this.customItems;
    }

    return this.generateBreadcrumbs();
  });

  private generateBreadcrumbs(): BreadcrumbItem[] {
    const breadcrumbs: BreadcrumbItem[] = [];
    const urlSegments = this.router.url.split('/').filter(segment => segment);

    // Always start with home
    breadcrumbs.push({
      label: this.languageService.translate('nav_home'),
      url: '/'
    });

    // Build breadcrumbs based on current route
    let currentPath = '';
    urlSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === urlSegments.length - 1;

      let label = this.getLabelForSegment(segment);

      breadcrumbs.push({
        label,
        url: isLast ? undefined : currentPath,
        isActive: isLast
      });
    });

    return breadcrumbs;
  }

  private getLabelForSegment(segment: string): string {
    // Handle dynamic segments
    if (segment.startsWith(':') || /^\d+$/.test(segment)) {
      // This is a parameter, try to get a meaningful label
      return this.getDynamicLabel(segment);
    }

    // Static route labels
    const routeLabels: { [key: string]: string } = {
      'products': this.languageService.translate('nav_products'),
      'produits': this.languageService.translate('nav_products'),
      'about': this.languageService.translate('nav_about'),
      'contact': this.languageService.translate('nav_contact'),
      'blog': this.languageService.translate('nav_blog'),
      'references': this.languageService.translate('nav_references'),
      'partenaires': this.languageService.translate('nav_partners')
    };

    return routeLabels[segment] || this.capitalizeFirst(segment);
  }

  private getDynamicLabel(segment: string): string {
    // For product IDs, try to get the product name
    if (this.router.url.includes('/produits/') || this.router.url.includes('/products/')) {
      // In a real app, you'd inject ProductService and get the product name
      // For now, return a generic label
      return 'Product Details';
    }

    // For blog posts
    if (this.router.url.includes('/blog/')) {
      return 'Blog Post';
    }

    return this.capitalizeFirst(segment);
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  goBack() {
    this.location.back();
  }
}