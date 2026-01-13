import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-switcher.html',
  styleUrls: ['./theme-switcher.css']
})
export class ThemeSwitcher {
  private themeService = inject(ThemeService);

  currentTheme = computed(() => this.themeService.theme());

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}