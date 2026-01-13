import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  partners: Partner[] = [
    { name: 'Divalto', logo: '/Partenaires/Divalto.webp' },
    { name: 'Tenor', logo: '/Partenaires/tenor-1.png' },
    { name: 'WaveSoft', logo: '/Partenaires/wavesoft.png' },
    { name: 'Sophos', logo: '/Partenaires/Sophos.png' }
  ];
}
