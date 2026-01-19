import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  private themeService = inject(ThemeService);
  private languageService = inject(LanguageService);
  readonly currentYear = new Date().getFullYear();

  // Translations
  navHome = computed(() => this.languageService.translate('nav_home'));
  navAbout = computed(() => this.languageService.translate('nav_about'));
  navProducts = computed(() => this.languageService.translate('nav_products'));
  navPartners = computed(() => this.languageService.translate('nav_partners'));
  navReferences = computed(() => this.languageService.translate('nav_references'));
  navContact = computed(() => this.languageService.translate('nav_contact'));

  footerTagline = computed(() => this.languageService.translate('footer_tagline'));
  footerSince = computed(() => this.languageService.translate('footer_since'));
  footerNavTitle = computed(() => this.languageService.translate('footer_nav_title'));
  footerProductsTitle = computed(() => this.languageService.translate('footer_products_title'));
  footerContactTitle = computed(() => this.languageService.translate('footer_contact_title'));
  footerCopyright = computed(() => this.languageService.translate('footer_copyright'));

  // Logo based on theme
  footerLogoPath = computed(() => {
    return this.themeService.theme() === 'light'
      ? '/Logo_Full_Black.png'
      : '/Logo.png';
  });
}
