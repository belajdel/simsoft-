import { TestBed } from '@angular/core/testing';
import { ThemeService, Theme } from './theme.service';
import { DOCUMENT } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

describe('ThemeService', () => {
    let service: ThemeService;
    let mockDocument: any;
    let mockLocalStorage: any;

    beforeEach(() => {
        mockDocument = {
            documentElement: {
                classList: {
                    add: vi.fn(),
                    remove: vi.fn()
                }
            }
        };

        vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
        vi.spyOn(Storage.prototype, 'setItem');

        TestBed.configureTestingModule({
            providers: [
                ThemeService,
                { provide: DOCUMENT, useValue: mockDocument },
                { provide: PLATFORM_ID, useValue: 'browser' }
            ]
        });
        service = TestBed.inject(ThemeService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with default light theme if no theme saved', () => {
        expect(service.theme()).toBe('light');
    });

    it('should toggle theme from light to dark', () => {
        service.toggleTheme();
        expect(service.theme()).toBe('dark');
        expect(Storage.prototype.setItem).toHaveBeenCalledWith('theme', 'dark');
        expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('dark-theme');
    });

    it('should toggle back to light theme', () => {
        service.setTheme('dark');
        service.toggleTheme();
        expect(service.theme()).toBe('light');
        expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('light-theme');
    });

    it('should apply theme classes correctly', () => {
        service.setTheme('dark');
        expect(mockDocument.documentElement.classList.remove).toHaveBeenCalledWith('dark-theme', 'light-theme');
        expect(mockDocument.documentElement.classList.add).toHaveBeenCalledWith('dark-theme');
    });
});
