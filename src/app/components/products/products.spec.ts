import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Products } from './products';
import { ProductService } from '../../services/product.service';
import { LanguageService } from '../../services/language.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ElementRef, signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('Products Component', () => {
    let component: Products;
    let fixture: ComponentFixture<Products>;
    let productService: any;
    let languageService: any;
    let router: any;

    const mockProducts = [
        {
            id: 'p1',
            title: 'Product 1',
            description: 'Desc 1',
            category: 'ERP',
            iconSvg: 'chart' as any,
            features: ['f1'],
            images: [],
            longDescription: 'Long'
        },
        {
            id: 'p2',
            title: 'Product 2',
            description: 'Desc 2',
            category: 'Security',
            iconSvg: 'shield' as any,
            features: ['f2'],
            images: [],
            longDescription: 'Long'
        }
    ];

    beforeEach(async () => {
        productService = { getProducts: vi.fn() };
        languageService = {
            translate: vi.fn(),
            language: signal('fr')
        };
        router = { navigate: vi.fn() };

        productService.getProducts.mockReturnValue(mockProducts);
        languageService.translate.mockImplementation((key: string) => key);

        await TestBed.configureTestingModule({
            imports: [Products],
            providers: [
                provideRouter([]),
                { provide: ProductService, useValue: productService },
                { provide: LanguageService, useValue: languageService },
                { provide: Router, useValue: router }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(Products);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display products from service', () => {
        expect(component.displayedProducts().length).toBe(2);
        expect(component.displayedProducts()[0].title).toBe('Product 1');
    });

    it('should filter products by category', () => {
        component.setCategory('ERP');
        expect(component.filteredProducts().length).toBe(1);
        expect(component.filteredProducts()[0].category).toBe('ERP');

        component.setCategory('all');
        expect(component.filteredProducts().length).toBe(2);
    });

    it('should navigate to product detail', async () => {
        vi.spyOn(window, 'scrollTo').mockImplementation(() => { });
        component.navigateToProduct('p1');

        await new Promise(resolve => setTimeout(resolve, 305));
        expect(router.navigate).toHaveBeenCalledWith(['/produits', 'p1']);
    });

    it('should translate titles using language service', () => {
        expect(component.productsTitle()).toBe('products_title');
        expect(languageService.translate).toHaveBeenCalledWith('products_title');
    });

    it('should return safe SVG for icons', () => {
        const icon = component.getIconSvg('chart');
        expect(icon).toBeTruthy();
    });
});
