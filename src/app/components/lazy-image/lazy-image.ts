import { Component, Input, Output, EventEmitter, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lazy-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lazy-image.html',
  styleUrls: ['./lazy-image.css']
})
export class LazyImageComponent {
  @Input() src!: string;
  @Input() alt = '';
  @Input() width?: number;
  @Input() height?: number;
  @Input() priority = false;
  @Input() placeholder?: string;

  @Output() imageLoaded = new EventEmitter<void>();
  @Output() imageError = new EventEmitter<Error>();

  isLoaded = signal(false);
  isError = signal(false);
  isLoading = signal(true);

  // Generate srcset for responsive images
  srcset = computed(() => {
    if (!this.src) return '';

    const baseUrl = this.src.split('.')[0];
    const extension = this.src.split('.').pop();

    return `${baseUrl}-480w.${extension} 480w, ${baseUrl}-768w.${extension} 768w, ${baseUrl}-1024w.${extension} 1024w, ${this.src} 1200w`;
  });

  sizes = computed(() => {
    return '(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
  });

  loadingAttribute = computed(() => this.priority ? 'eager' : 'lazy');

  onImageLoad() {
    this.isLoaded.set(true);
    this.isLoading.set(false);
    this.imageLoaded.emit();
  }

  onImageError(error: any) {
    this.isError.set(true);
    this.isLoading.set(false);
    this.imageError.emit(error);
  }
}