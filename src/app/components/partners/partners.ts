import { Component, signal } from '@angular/core';
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
  itemsPerView = 4; // Show 4 items at once on desktop, adjusted by CSS for mobile

  partners: Partner[] = [
    { name: 'AF-Beton', logo: '/References/AF-Beton.png' },
    { name: 'AF-TR', logo: '/References/AF-TR.png' },
    { name: 'Assenceur Zouali', logo: '/References/assenceur-zouali.png' },
    { name: 'Borni Transport', logo: '/References/borni-transport-3.png' },
    { name: 'CCMM', logo: '/References/CCMM.png' },
    { name: 'CNP', logo: '/References/cnp.png' },
    { name: 'Falcon Inter', logo: '/References/falcon-inter.png' },
    { name: 'Gravic', logo: '/References/gravic.png' },
    { name: 'CGPR', logo: '/References/LOGO-CGPR.png' },
    { name: 'STE MRASI Frères', logo: '/References/LOGO-STE-MRASI-Fréres.jpg' },
    { name: 'Municipalité Rouad', logo: '/References/municipalité_rouad.png' },
    { name: 'Orange Tunisie', logo: '/References/orange-tunis.png' },
    { name: 'SMTT', logo: '/References/SMTT.png' },
    { name: 'SNTT Tataouine', logo: '/References/société-SNTT-tataouine.jpg' },
    { name: 'Sotufab', logo: '/References/sotufab.png' },
    { name: 'Sotufab Plast', logo: '/References/sotufab-plast.png' },
    { name: 'Spolo', logo: '/References/spolo.png' },
    { name: 'TIS', logo: '/References/TIS_Resize.png' },
    { name: 'Watts', logo: '/References/watts-1.png' }
  ];

  get visiblePartners(): Partner[] {
    const start = this.currentIndex();
    return this.partners.slice(start, start + this.itemsPerView);
  }

  get canGoPrevious(): boolean {
    return this.currentIndex() > 0;
  }

  get canGoNext(): boolean {
    return this.currentIndex() + this.itemsPerView < this.partners.length;
  }

  get totalPages(): number {
    return Math.ceil(this.partners.length / this.itemsPerView);
  }

  get currentPage(): number {
    return Math.floor(this.currentIndex() / this.itemsPerView) + 1;
  }

  previous() {
    if (this.canGoPrevious) {
      this.currentIndex.update(index => Math.max(0, index - this.itemsPerView));
    }
  }

  next() {
    if (this.canGoNext) {
      this.currentIndex.update(index =>
        Math.min(this.partners.length - this.itemsPerView, index + this.itemsPerView)
      );
    }
  }

  goToPage(page: number) {
    const index = (page - 1) * this.itemsPerView;
    if (index >= 0 && index < this.partners.length) {
      this.currentIndex.set(index);
    }
  }
}
