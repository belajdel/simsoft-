import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Partenaires } from './partenaires';
import { ThemeService } from '../../services/theme.service';
import { signal } from '@angular/core';

describe('Partenaires Component', () => {
    let component: Partenaires;
    let fixture: ComponentFixture<Partenaires>;
    let themeService: any;

    beforeEach(async () => {
        themeService = {
            toggleTheme: vi.fn(),
            theme: signal('dark')
        };

        await TestBed.configureTestingModule({
            imports: [Partenaires],
            providers: [
                { provide: ThemeService, useValue: themeService }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Partenaires);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have partners', () => {
        expect(component.partners.length).toBe(4);
    });

    it('should return black logo for WaveSoft in light theme', () => {
        (component.themeService.theme as any).set('light');
        const partner = { name: 'WaveSoft', logo: 'white.png' };
        const logo = component.getPartnerLogo(partner);
        expect(logo).toBe('/Partenaires/wavesoft_black.png');
    });

    it('should return original logo for WaveSoft in dark theme', () => {
        (component.themeService.theme as any).set('dark');
        const partner = { name: 'WaveSoft', logo: 'white.png' };
        const logo = component.getPartnerLogo(partner);
        expect(logo).toBe('white.png');
    });

    it('should return original logo for other partners', () => {
        (component.themeService.theme as any).set('light');
        const partner = { name: 'Divalto', logo: 'divalto.png' };
        const logo = component.getPartnerLogo(partner);
        expect(logo).toBe('divalto.png');
    });
});
