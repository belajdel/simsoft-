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

  languages: { code: Language; name: string;  }[] = [
    { code: 'fr', name: 'Fr' },
    { code: 'en', name: 'En' }
  ];  

  setLanguage(language: Language) {
    this.languageService.setLanguage(language);
    // Force change detection
    this.cdr.detectChanges();
  }

  getCurrentLanguageName(): string {
    const lang = this.languages.find(l => l.code === this.currentLanguage());
    return lang?.name || '🌐';
  }
}