import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-hero',
  imports: [CommonModule, RouterLink],
  templateUrl: './hero.html',
  styleUrls: ['./hero.css'],
})
export class Hero {
aboutClients() {
throw new Error('Method not implemented.');
}
  private languageService = inject(LanguageService);
  constructor(private sanitizer: DomSanitizer) { }

  // About section translations
  aboutTitle = computed(() => this.languageService.translate('about_title'));
  aboutSubtitle = computed(() => this.languageService.translate('about_subtitle'));
  aboutDescription1 = computed(() => this.languageService.translate('about_description1'));
  aboutDescription2 = computed(() => this.languageService.translate('about_description2'));
  aboutDescription3 = computed(() => this.languageService.translate('about_description3'));
  aboutTechnologyTitle = computed(() => this.languageService.translate('about_technology_title'));
  aboutTechnologyDesc = computed(() => this.languageService.translate('about_technology_desc'));
  aboutInternationalTitle = computed(() => this.languageService.translate('about_international_title'));
  aboutInternationalDesc = computed(() => this.languageService.translate('about_international_desc'));
  aboutCreationYear = computed(() => this.languageService.translate('about_creation_year'));
  aboutFiliales = computed(() => this.languageService.translate('about_filiales'));
  aboutExperience = computed(() => this.languageService.translate('about_experience'));

  // Hero translations
  heroTitle = computed(() => this.languageService.translate('hero_title'));
  heroTagline = computed(() => this.languageService.translate('hero_tagline'));
  heroDescription = computed(() => this.languageService.translate('hero_description'));
  heroDiscover = computed(() => this.languageService.translate('hero_discover'));
  heroContact = computed(() => this.languageService.translate('hero_contact'));

  getIconSvg(iconName: string): SafeHtml {
    const icons: { [key: string]: string } = {
      building: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 21H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 21V7L13 2L21 7V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 17V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 9V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 17V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      globe: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M2 12H22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    };
    const svg = icons[iconName] || '';
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
