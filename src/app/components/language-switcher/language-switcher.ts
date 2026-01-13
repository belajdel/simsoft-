import { Component, inject, computed, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService, Language } from '../../services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switcher.html',
  styleUrls: ['./language-switcher.css']
})
export class LanguageSwitcher {
  private languageService = inject(LanguageService);
  private cdr = inject(ChangeDetectorRef);

  currentLanguage = computed(() => this.languageService.language());
  isOpen = false;

  languages: { code: Language; name: string; flag: string; fullName: string }[] = [
    { code: 'fr', name: 'Fr', flag: '🇫🇷', fullName: 'Français' },
    { code: 'en', name: 'En', flag: '🇬🇧', fullName: 'English' }
  ];  

  setLanguage(language: Language) {
    this.languageService.setLanguage(language);
    this.isOpen = false;
    // Force change detection
    this.cdr.detectChanges();
  }

  getCurrentLanguage(): { code: Language; name: string; flag: string; fullName: string } | undefined {
    return this.languages.find(l => l.code === this.currentLanguage());
  }
}