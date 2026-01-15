import { Component, signal, HostListener, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Partner {
  name: string;
  logo: string;
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
  itemsPerView = signal(4); // Default to 4

  partners: Partner[] = [
    { name: 'CGPR', logo: '/References/LOGO-CGPR.png' },
    { name: 'AF-TR', logo: '/References/AF-TR.png' },
    { name: 'Assenceur Zouali', logo: '/References/assenceur-zouali.png' },
    { name: 'ATEX', logo: '/References/atex.png' },
    { name: 'AF-Beton', logo: '/References/AF-Beton.png' },
    { name: 'CCMM', logo: '/References/CCMM.png' },
    { name: 'Chahia', logo: '/References/chahia.png' },
    { name: 'CNP', logo: '/References/cnp.png' },
    { name: 'Commune Nabeul', logo: '/References/communenabeul.png' },
    { name: 'CoProPha', logo: '/References/coProPha.png' },
    { name: 'CTM', logo: '/References/ctm.png' },
    { name: 'El Jam', logo: '/References/eljam.png' },
    { name: 'Falcon Inter', logo: '/References/falcon-inter.png' },
    { name: 'Gravic', logo: '/References/gravic.png' },
    { name: 'Linde', logo: '/References/linde.png' },
    { name: 'STE MRASI Frères', logo: '/References/LOGO-STE-MRASI-Fréres.png' },
    { name: 'Mabrouka', logo: '/References/mabrouka.png' },
    { name: 'Municipalité Rouad', logo: '/References/municipalité_rouad.png' },
    { name: 'Newbox', logo: '/References/newbox.png' },
    { name: 'SMTT', logo: '/References/SMTT.png' },
    { name: 'SNTT Tataouine', logo: '/References/société-SNTT-tataouine.jpg' },
    { name: 'SRT Kef', logo: '/References/srtKef.png' },
    { name: 'SRT Sud', logo: '/References/srtsud.png' },
    { name: 'Téléchargement', logo: '/References/téléchargement-2.png' },
    { name: 'Thapsus Voyage', logo: '/References/thapsusVoyage.png' },
    { name: 'TIS', logo: '/References/TIS_Resize.png' },
    { name: 'VIT', logo: '/References/vit.png' },
    { name: 'Watts', logo: '/References/watts-1.png' }
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
