import { Component, inject, computed } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { BackgroundEffects } from './components/background-effects/background-effects';
import { Chatbot } from './components/chatbot/chatbot';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    Header,
    Footer,
    BackgroundEffects,
    Chatbot,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private router = inject(Router);

  // Get current route URL
  private currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map(event => event.urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  // Check if footer should be hidden (products and contact pages)
  shouldHideFooter = computed(() => {
    const url = this.currentUrl();
    return url?.startsWith('/produits') || url === '/contact';
  });
}