import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { of } from 'rxjs';

describe('Home Component', () => {
    let component: Home;
    let fixture: ComponentFixture<Home>;

    beforeEach(async () => {
        const productServiceSpy = { getProducts: vi.fn().mockReturnValue([]) };
        const languageServiceSpy = { translate: vi.fn().mockReturnValue('translated') };

        await TestBed.configureTestingModule({
            imports: [Home, RouterTestingModule],
            providers: [
                { provide: ProductService, useValue: productServiceSpy },
                { provide: LanguageService, useValue: languageServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Home);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render main sections', () => {
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('app-hero')).toBeTruthy();
        expect(compiled.querySelector('app-products')).toBeTruthy();
        expect(compiled.querySelector('app-partners')).toBeTruthy();
        expect(compiled.querySelector('app-partenaires')).toBeTruthy();
    });
});
