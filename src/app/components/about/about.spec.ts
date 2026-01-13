import { ComponentFixture, TestBed } from '@angular/core/testing';
import { About } from './about';
import { DomSanitizer } from '@angular/platform-browser';

describe('About Component', () => {
    let component: About;
    let fixture: ComponentFixture<About>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [About]
        }).compileComponents();

        fixture = TestBed.createComponent(About);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return safe HTML for icons', () => {
        const icon = component.getIconSvg('building');
        expect(icon).toBeTruthy();
    });
});
