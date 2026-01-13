import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { LanguageService } from '../../services/language.service';
import { ThemeService } from '../../services/theme.service';
import { signal } from '@angular/core';

describe('Header Component', () => {
    let component: Header;
    let fixture: ComponentFixture<Header>;
    let languageService: any;
    let themeService: any;

    beforeEach(async () => {
        languageService = {
            translate: vi.fn(),
            language: signal('fr')
        };
        themeService = {
            toggleTheme: vi.fn(),
            theme: signal('dark')
        };

        languageService.translate.mockImplementation((key: string) => key);

        await TestBed.configureTestingModule({
            imports: [Header, RouterTestingModule],
            providers: [
                { provide: LanguageService, useValue: languageService },
                { provide: ThemeService, useValue: themeService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Header);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open and close menu', () => {
        expect(component.isMenuOpen()).toBe(false);
        component.toggleMenu();
        expect(component.isMenuOpen()).toBe(true);
        component.closeMenu();
        expect(component.isMenuOpen()).toBe(false);
    });

    it('should update isScrolled on scroll', () => {
        // Mock scroll position
        Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
        window.dispatchEvent(new Event('scroll'));
        expect(component.isScrolled()).toBe(true);

        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
        window.dispatchEvent(new Event('scroll'));
        expect(component.isScrolled()).toBe(false);
    });

    it('should use correct logo path based on theme', () => {
        (themeService.theme as any).set('dark');
        expect(component.logoPath()).toBe('/Logo_white.png');

        (themeService.theme as any).set('light');
        expect(component.logoPath()).toBe('/Logo_Black.png');
    });
});
