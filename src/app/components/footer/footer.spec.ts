import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Footer } from './footer';
import { ThemeService } from '../../services/theme.service';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';

describe('Footer Component', () => {
    let component: Footer;
    let fixture: ComponentFixture<Footer>;
    let themeService: any;

    beforeEach(async () => {
        themeService = {
            toggleTheme: vi.fn(),
            theme: signal('dark')
        };

        await TestBed.configureTestingModule({
            imports: [Footer, RouterTestingModule],
            providers: [
                { provide: ThemeService, useValue: themeService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Footer);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the current year', () => {
        const year = new Date().getFullYear();
        expect(component.currentYear).toBe(year);
    });

    it('should use correct logo path based on theme', () => {
        (themeService.theme as any).set('dark');
        expect(component.footerLogoPath()).toBe('/Logo.png');

        (themeService.theme as any).set('light');
        expect(component.footerLogoPath()).toBe('/Logo_Full_Black.png');
    });
});
