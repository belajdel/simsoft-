import { Component, signal, HostListener, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

interface Partner {
  name: string;
  logo: string;
  keepColors?: boolean;
  isGiant?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-partners',
  imports: [CommonModule],
  templateUrl: './partners.html',
  styleUrls: ['./partners.css'],
})
export class Partners {
  currentIndex = signal(0);
  itemsPerView = signal(4);
  protected languageService = inject(LanguageService);

  title = computed(() => this.languageService.translate('references_title'));
  subtitle = computed(() => this.languageService.translate('references_subtitle'));
  description = computed(() => this.languageService.translate('references_description'));

  partners: Partner[] = [
    { name: 'CGPR', logo: '/References/LOGO-CGPR.png', keepColors: true },
    { name: 'AF-TR', logo: '/References/AF-TR.png', keepColors: true },

    { name: 'Assenceur Zouali', logo: '/References/assenceur-zouali.png', keepColors: true },
    { name: 'ATEX', logo: '/References/atex.png', keepColors: true },
    { name: 'AF-Beton', logo: '/References/AF-beton.svg', keepColors: true },
    { name: 'CCMM', logo: '/References/CCMM.png', keepColors: true },
    { name: 'Chahia', logo: '/References/chahia.png' },

    { name: 'Commune Nabeul', logo: '/References/communenabeul.png', keepColors: true },
    { name: 'CoProPha', logo: '/References/coProPha.png', keepColors: true },
    { name: 'CTM', logo: '/References/ctm.png', keepColors: true, isGiant: true },
    { name: 'El Jam', logo: '/References/eljam.png', keepColors: true },
    { name: 'Falcon Inter', logo: '/References/falcon-inter.png', keepColors: true, isGiant: true },
    { name: 'Gravic', logo: '/References/gravic.png', keepColors: true },
    { name: 'Linde', logo: '/References/linde.png', keepColors: true },
    { name: 'STE MRASI Frères', logo: '/References/LOGO-STE-MRASI-Fréres.svg', isGiant: true },
    { name: 'Mabrouka', logo: '/References/mabrouka.png' },
    { name: 'Municipalité Rouad', logo: '/References/municipalité_rouad.png', keepColors: true },
    { name: 'Newbox', logo: '/References/newbox.png', keepColors: true },
    { name: 'SMTT', logo: '/References/SMTT.png', isGiant: true, keepColors: true },
    { name: 'SNTT Tataouine', logo: '/References/société-SNTT-tataouine.jpg', keepColors: true, isGiant: true },
    { name: 'SRT Kef', logo: '/References/srtKef.png', keepColors: true },
    { name: 'SRT Sud', logo: '/References/srtsud.png' },
    { name: 'Téléchargement', logo: '/References/téléchargement-2.png', keepColors: true },
    { name: 'Thapsus Voyage', logo: '/References/thapsusVoyage.png', isGiant: true, keepColors: true },
    { name: 'TIS', logo: '/References/TIS_Resize.png', isGiant: true, keepColors: true },
    { name: 'VIT', logo: '/References/vit.png', keepColors: true, isGiant: true },
    { name: 'Watts', logo: '/References/watts-1.png', isGiant: true }
  ];

  // Computed property for transform value (optional, can use inline template)
  transformValue = computed(() => {
    const percentage = -this.currentIndex() * (100 / this.itemsPerView());
    return `translateX(${percentage}%)`;
  });

  // Computed properties for button states
  canGoPrevious = computed(() => this.currentIndex() > 0);

  canGoNext = computed(() => {
    const maxIndex = Math.max(0, this.partners.length - this.itemsPerView());
    return this.currentIndex() < maxIndex;
  });

  constructor() {
    this.updateItemsPerView();
  }

  // Listen to window resize events to update the number of items per view
  @HostListener('window:resize')
  onResize() {
    this.updateItemsPerView();
    // Reset index if it becomes invalid after resize
    const maxIndex = Math.max(0, this.partners.length - this.itemsPerView());
    if (this.currentIndex() > maxIndex) {
      this.currentIndex.set(maxIndex);
    }
  }

  private updateItemsPerView() {
    const width = window.innerWidth;
    if (width <= 480) {
      this.itemsPerView.set(1);
    } else if (width <= 768) {
      this.itemsPerView.set(2);
    } else if (width <= 1024) {
      this.itemsPerView.set(3);
    } else {
      this.itemsPerView.set(4);
    }
  }

  previous() {
    if (this.canGoPrevious()) {
      this.currentIndex.update(index => Math.max(0, index - this.itemsPerView()));
    }
  }

  next() {
    if (this.canGoNext()) {
      const maxIndex = Math.max(0, this.partners.length - this.itemsPerView());
      this.currentIndex.update(index => Math.min(maxIndex, index + this.itemsPerView()));
    }
  }
}
