import { Component, inject, computed, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  standalone: true,
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink, BreadcrumbComponent],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.css']
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private seoService = inject(SeoService);
  private analyticsService = inject(AnalyticsService);
  private sanitizer = inject(DomSanitizer);
  private productService = inject(ProductService);
  
  // Try to use input from route binding first, fallback to route params
  routeId = input<string>('');
  private routeParams = toSignal(this.route.params);
  
  productId = computed(() => {
    const inputId = this.routeId();
    if (inputId) return inputId;
    const params = this.routeParams();
    return params ? params['id'] : '';
  });

  selectedImageIndex = signal(0);

  product = computed(() => {
    const productId = this.productId();
    return productId ? this.productService.getProductById(productId) : undefined;
  });

  selectedImage = computed(() => {
    const p = this.product();
    const idx = this.selectedImageIndex();
    return p && p.images && p.images.length > 0 ? p.images[idx] : '';
  });

  ngOnInit() {
    // Set up SEO for the product page
    const currentProduct = this.product();
    if (currentProduct) {
      this.seoService.updateMetaTags({
        title: `${currentProduct.title} - SimSoft Technologies`,
        description: currentProduct.description,
        keywords: [
          currentProduct.title,
          currentProduct.category,
          'SimSoft Technologies',
          'Tunisie',
          'logiciels',
          'ERP',
          'GMAO'
        ].concat(currentProduct.features.slice(0, 3)),
        type: 'product',
        image: currentProduct.images?.[0] || '/Logo.png'
      });

      // Track product view
      this.analyticsService.trackProductView(currentProduct.id, currentProduct.title);
    }
  }

  relatedProducts = computed(() => {
    const p = this.product();
    return p ? this.productService.getRelatedProducts(p.id) : [];
  });

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  prevImage() {
    const p = this.product();
    if (p && p.images && p.images.length > 0) {
      const current = this.selectedImageIndex();
      if (current > 0) {
        this.selectedImageIndex.set(current - 1);
      }
    }
  }

  nextImage() {
    const p = this.product();
    if (p && p.images && p.images.length > 0) {
      const current = this.selectedImageIndex();
      if (current < p.images.length - 1) {
        this.selectedImageIndex.set(current + 1);
      }
    }
  }

  getIconSvg(iconName: string): SafeHtml {
    const icons: { [key: string]: string } = {
      chart: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 16L12 11L16 15L21 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M21 10V3H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      car: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H5L6 5H18L19 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      platform: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      shield: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    };
    return this.sanitizer.bypassSecurityTrustHtml(icons[iconName] || '');
  }
}
