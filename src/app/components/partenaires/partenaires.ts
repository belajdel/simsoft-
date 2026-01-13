import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

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
