import { Component, inject, signal, computed, ElementRef, viewChild, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { BlogService } from '../../services/blog.service';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'product' | 'blog' | 'page';
  url: string;
  category?: string;
  tags?: string[];
}

export interface ProductSearchResult extends SearchResult {
  type: 'product';
  category: string;
}

export interface BlogSearchResult extends SearchResult {
  type: 'blog';
  tags: string[];
}

export interface PageSearchResult extends SearchResult {
  type: 'page';
}

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.html',
  styleUrls: ['./search.css']
})
export class SearchComponent {
  private router = inject(Router);
  private productService = inject(ProductService);
  languageService = inject(LanguageService);
  private blogService = inject(BlogService);

  searchInput = viewChild<ElementRef>('searchInput');

  query = signal('');
  isOpen = signal(false);
  selectedIndex = signal(-1);

  // Combine all searchable content
  allContent = computed(() => {
    const products = this.productService.getProducts().map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      type: 'product' as const,
      url: `/produits/${product.id}`,
      category: product.category
    }));

    const blogPosts = this.blogService.posts().map((post: any) => ({
      id: post.id,
      title: post.title,
      description: post.excerpt,
      type: 'blog' as const,
      url: `/blog/${post.id}`,
      tags: post.tags
    }));

    const pages = [
      {
        id: 'home',
        title: this.languageService.translate('nav_home'),
        description: this.languageService.translate('hero_description'),
        type: 'page' as const,
        url: '/'
      },
      {
        id: 'about',
        title: this.languageService.translate('nav_about'),
        description: this.languageService.translate('about_subtitle'),
        type: 'page' as const,
        url: '/about'
      },
      {
        id: 'contact',
        title: this.languageService.translate('nav_contact'),
        description: this.languageService.translate('contact_description'),
        type: 'page' as const,
        url: '/contact'
      }
    ];

    return [...products, ...blogPosts, ...pages];
  });

  searchResults = computed(() => {
    const query = this.query().toLowerCase().trim();
    if (!query) return [];

    return this.allContent()
      .filter(item => {
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesDescription = item.description.toLowerCase().includes(query);
        const matchesCategory = (item as any).category?.toLowerCase().includes(query) || false;
        const matchesTags = (item as any).tags?.some((tag: string) => tag.toLowerCase().includes(query)) || false;

        return matchesTitle || matchesDescription || matchesCategory || matchesTags;
      })
      .slice(0, 8); // Limit results
  });

  hasResults = computed(() => this.searchResults().length > 0);

  // Close dropdown when clicking outside
  private clickOutsideEffect = effect(() => {
    if (typeof window !== 'undefined') {
      const handleClickOutside = (event: Event) => {
        const searchInput = this.searchInput();
        if (searchInput && !searchInput.nativeElement.contains(event.target as Node)) {
          this.isOpen.set(false);
        }
      };

      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
    return () => { };
  });

  onInputFocus() {
    if (this.query().trim()) {
      this.isOpen.set(true);
    }
  }

  onInputChange(value: string) {
    this.query.set(value);
    this.selectedIndex.set(-1);
    this.isOpen.set(value.trim().length > 0);
  }

  onKeyDown(event: KeyboardEvent) {
    const results = this.searchResults();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.set(Math.min(this.selectedIndex() + 1, results.length - 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.set(Math.max(this.selectedIndex() - 1, -1));
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex() >= 0) {
          this.navigateToResult(results[this.selectedIndex()]);
        } else if (results.length === 1) {
          this.navigateToResult(results[0]);
        }
        break;
      case 'Escape':
        this.isOpen.set(false);
        this.selectedIndex.set(-1);
        break;
    }
  }

  navigateToResult(result: SearchResult) {
    this.router.navigate([result.url]);
    this.isOpen.set(false);
    this.query.set('');
  }

  getResultIcon(type: string): string {
    switch (type) {
      case 'product': return '🛠️';
      case 'blog': return '📝';
      case 'page': return '📄';
      default: return '🔍';
    }
  }

  getResultTypeLabel(type: string): string {
    const isFr = this.languageService.language() === 'fr';
    const labels = {
      product: isFr ? 'Produit' : 'Product',
      blog: isFr ? 'Article' : 'Blog post',
      page: isFr ? 'Page' : 'Page'
    };
    return labels[type as keyof typeof labels] || type;
  }
}