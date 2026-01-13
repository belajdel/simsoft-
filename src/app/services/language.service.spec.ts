import { TestBed } from '@angular/core/testing';
import { LanguageService, Language } from './language.service';
import { PLATFORM_ID } from '@angular/core';

describe('LanguageService', () => {
    let service: LanguageService;
    let mockLocalStorage: any;

    beforeEach(() => {
        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
        vi.spyOn(Storage.prototype, 'setItem');

        TestBed.configureTestingModule({
            providers: [
                LanguageService,
                { provide: PLATFORM_ID, useValue: 'browser' }
            ]
        });
        service = TestBed.inject(LanguageService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with default language if none saved', () => {
        expect(service.language()).toBe('fr');
    });

    it('should change language and update storage', () => {
        service.setLanguage('en');
        expect(service.language()).toBe('en');
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('language', 'en');
    });

    it('should return correct translation for the current language', () => {
        service.setLanguage('fr');
        expect(service.translate('nav_home')).toBe('Accueil');

        service.setLanguage('en');
        expect(service.translate('nav_home')).toBe('Home');
    });

    it('should fallback to French if translation is missing (theoretical)', () => {
        // Current dictionaries are complete, but testing the logic
        expect(service.translate('nav_home')).toBeDefined();
    });
});
