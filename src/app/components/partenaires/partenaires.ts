import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { LanguageService } from '../../services/language.service';

interface Partner {
  name: string;
  logo: string;
}

@Component({
  standalone: true,
  selector: 'app-partenaires',
  imports: [CommonModule],
  templateUrl: './partenaires.html',
  styleUrls: ['./partenaires.css'],
})
export class Partenaires {
  themeService = inject(ThemeService);
  private languageService = inject(LanguageService);

  title = computed(() => this.languageService.translate('partners_title'));
  subtitle = computed(() => this.languageService.translate('partners_subtitle'));
  description = computed(() => this.languageService.translate('partners_description'));

  partners: Partner[] = [
    { name: 'Divalto', logo: '/Partenaires/Divalto.webp' },
    { name: 'Tenor', logo: '/Partenaires/tenor-1.png' },
    { name: 'WaveSoft', logo: '/Partenaires/wavesoft.png' },
    { name: 'Sophos', logo: '/Partenaires/Sophos.png' }
  ];

  getPartnerLogo(partner: Partner): string {
    if (partner.name === 'WaveSoft' && this.themeService.theme() === 'light') {
      return '/Partenaires/wavesoft_black.png';
    }
    return partner.logo;
  }
}
