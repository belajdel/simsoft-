import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  standalone: true,
  selector: 'app-footer',
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
})
export class Footer {
  private themeService = inject(ThemeService);
  readonly currentYear = new Date().getFullYear();

  // Logo based on theme
  footerLogoPath = computed(() => {
    return this.themeService.theme() === 'light' 
      ? '/Logo_Full_Black.png' 
      : '/Logo.png';
  });
}
