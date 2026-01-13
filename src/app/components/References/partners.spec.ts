import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Partners } from './partners';

describe('Partners Component (References)', () => {
    let component: Partners;
    let fixture: ComponentFixture<Partners>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [Partners]
        }).compileComponents();

        fixture = TestBed.createComponent(Partners);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a list of partners', () => {
        expect(component.partners.length).toBeGreaterThan(0);
        expect(component.partners[0].name).toBe('CGPR');
    });

    it('should start with index 0', () => {
        expect(component.currentIndex()).toBe(0);
    });

    it('should update items per view based on window width', () => {
        // Simulate mobile width
        const widthSpy = vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(400);
        window.dispatchEvent(new Event('resize'));
        expect(component.itemsPerView()).toBe(1);

        // Simulate desktop width
        widthSpy.mockReturnValue(1200);
        window.dispatchEvent(new Event('resize'));
        expect(component.itemsPerView()).toBe(4);

        // Clean up
        widthSpy.mockRestore();
    });

    it('should navigate next and previous', () => {
        const initialIndex = component.currentIndex();
        // Assuming we have more than itemsPerView partners
        if (component.canGoNext()) {
            component.next();
            expect(component.currentIndex()).toBeGreaterThan(initialIndex);

            const nextIndex = component.currentIndex();
            component.previous();
            expect(component.currentIndex()).toBeLessThan(nextIndex);
        }
    });

    it('should calculate transform value correctly', () => {
        component.currentIndex.set(1);
        component.itemsPerView.set(4);
        expect(component.transformValue()).toBe('translateX(-25%)');
    });
});
