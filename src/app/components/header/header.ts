import { Component, HostListener, signal, inject, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeSwitcher } from '../theme-switcher/theme-switcher';
import { LanguageSwitcher } from '../language-switcher/language-switcher';
import { SearchComponent } from '../search/search';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, ThemeSwitcher, LanguageSwitcher, SearchComponent],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private languageService = inject(LanguageService);

  isScrolled = signal(false);
  isMenuOpen = signal(false);

  // Navigation translations
  navHome = computed(() => this.languageService.translate('nav_home'));
  navAbout = computed(() => this.languageService.translate('nav_about'));
  navProducts = computed(() => this.languageService.translate('nav_products'));
  navPartners = computed(() => this.languageService.translate('nav_partners'));
  navReferences = computed(() => this.languageService.translate('nav_references'));
  navContact = computed(() => this.languageService.translate('nav_contact'));
  navBlog = computed(() => this.languageService.translate('nav_blog'));

  constructor(private router: Router) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 50);
  }

  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  async scrollToSection(event: Event, targetId: string) {
    event.preventDefault();
    this.closeMenu();

    const element = document.querySelector(targetId);

    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    } else {
      // Element is on another page (probably Home), navigate there
      // The '#' is needed for the fragment, but we pass the ID without '#' to fragment
      const fragment = targetId.startsWith('#') ? targetId.substring(1) : targetId;
      await this.router.navigate(['/'], { fragment: fragment });

      // Wait a bit for navigation and view to settle then scroll (fallback if anchorScrolling doesn't catch it perfect with offset)
      // Though anchorScrolling might handle it, manual scroll provides better offset control
      setTimeout(() => {
        const el = document.querySelector(targetId);
        if (el) {
          const headerHeight = 80;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }
}