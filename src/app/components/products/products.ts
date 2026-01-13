import { Component, inject, computed, signal, effect, viewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { ElementRef } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-products',
  imports: [CommonModule, RouterLink],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements AfterViewInit, OnDestroy {
  private sanitizer = inject(DomSanitizer);
  private productService = inject(ProductService);
  private router = inject(Router);
  languageService = inject(LanguageService);

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  private allProducts = computed(() => this.productService.getProducts());

  // Infinite scroll state
  private itemsPerPage = 6;
  private currentPage = signal(1);
  readonly isLoading = signal(false);
  readonly hasMoreItems = signal(true);
  private selectedCategory = signal<string>('all');

  // View children for scroll detection
  private container = viewChild<ElementRef>('productsContainer');

  // Filtered products
  filteredProducts = computed(() => {
    const all = this.allProducts();
    const category = this.selectedCategory();
    if (category === 'all') return all;
    return all.filter(product => product.category === category);
  });

  // Computed displayed products
  displayedProducts = computed(() => {
    const filtered = this.filteredProducts();
    const page = this.currentPage();
    const itemsToShow = page * this.itemsPerPage;
    return filtered.slice(0, itemsToShow);
  });

  // Update hasMoreItems when products change
  private updateHasMoreItemsEffect = effect(() => {
    this.displayedProducts();
    this.updateHasMoreItems();
  });

  // Translations
  productsTitle = computed(() => this.languageService.translate('products_title'));
  productsSubtitle = computed(() => this.languageService.translate('products_subtitle'));
  productsDescription = computed(() => this.languageService.translate('products_description'));
  productsAll = computed(() => this.languageService.translate('products_all'));
  productsERP = computed(() => this.languageService.translate('products_erp'));
  productsGMAO = computed(() => this.languageService.translate('products_gmao'));
  productsSecurity = computed(() => this.languageService.translate('products_security'));
  productsCloud = computed(() => this.languageService.translate('products_cloud'));
  productsDevelopment = computed(() => this.languageService.translate('products_development'));
  productsAnalytics = computed(() => this.languageService.translate('products_analytics'));
  productsDiscover = computed(() => this.languageService.translate('products_discover'));
  loadingText = computed(() => this.languageService.translate('loading'));

  // Track if we're at the end
  private updateHasMoreItems() {
    const filtered = this.filteredProducts();
    const displayed = this.displayedProducts();
    this.hasMoreItems.set(displayed.length < filtered.length);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
    this.currentPage.set(1); // Reset pagination when filtering
    this.isLoading.set(false);
  }

  ngAfterViewInit() {
    // Set up infinite scroll listener
    const container = this.container();
    if (container) {
      const element = container.nativeElement;

      const scrollHandler = () => {
        if (this.isLoading() || !this.hasMoreItems()) return;

        const { scrollTop, scrollHeight, clientHeight } = element;
        const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200; // 200px threshold

        if (isNearBottom) {
          this.loadMore();
        }
      };

      element.addEventListener('scroll', scrollHandler);

      // Store cleanup function
      this.scrollCleanup = () => {
        element.removeEventListener('scroll', scrollHandler);
      };
    }
  }

  private scrollCleanup?: () => void;

  ngOnDestroy() {
    if (this.scrollCleanup) {
      this.scrollCleanup();
    }
  }

  private loadMore() {
    if (this.isLoading() || !this.hasMoreItems()) return;

    this.isLoading.set(true);

    // Simulate loading delay for smooth UX with variable timing
    const loadingTime = Math.random() * 800 + 600; // 600-1400ms
    setTimeout(() => {
      this.currentPage.update(page => page + 1);
      this.isLoading.set(false);
    }, loadingTime);
  }

  navigateToProduct(productId: string) {
    // Smooth scroll to top before navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      this.router.navigate(['/produits', productId]);
    }, 300);
  }

  getIconSvg(iconName: string): SafeHtml {
    const icons: { [key: string]: string } = {
      chart: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 3V21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 16L12 11L16 15L21 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 10V3H14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      car: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 17H4C3.46957 17 2.96086 16.7893 2.58579 16.4142C2.21071 16.0391 2 15.5304 2 15V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H5L6 5H18L19 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V15C22 15.5304 21.7893 16.0391 21.4142 16.4142C21.0391 16.7893 20.5304 17 20 17H19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7 17V21H9V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 17V21H17V17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 9L8 5H16L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      platform: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      shield: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      cloud: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 16C3.15 16 0 12.85 0 9C0 5.15 3.15 2 7 2C9.1 2 11 3.05 12.25 4.75C13.2 3.65 14.7 3 16.25 3C19.7 3 22.5 5.8 22.5 9.25C22.5 10.5 22.1 11.65 21.4 12.6C22.35 13.15 23 14.2 23 15.4C23 17.6 21.2 19.4 19 19.4H7V16Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
         <path d="M12 14L15 11L18 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 11V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      code: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 18L22 12L16 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 6L2 12L8 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      database: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 9V15C21 17.209 16.971 19 12 19C7.029 19 3 17.209 3 15V9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 5C21 7.209 16.971 9 12 9C7.029 9 3 7.209 3 5C3 2.791 7.029 1 12 1C16.971 1 21 2.791 21 5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 15V19C3 21.209 7.029 23 12 23C16.971 23 21 21.209 21 19V15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      network: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="14" width="6" height="6" rx="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="9" y="4" width="6" height="6" rx="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="16" y="14" width="6" height="6" rx="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 14V12C5 11.4696 5.21071 10.9609 5.58579 10.5858C5.96086 10.2107 6.46957 10 7 10H17C17.5304 10 18.0391 10.2107 18.4142 10.5858C18.7893 10.9609 19 11.4696 19 12V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 10V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      mobile: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 18H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      analytics: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 20V10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 20V4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M6 20V14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    };
    const svg = icons[iconName] || '';
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
