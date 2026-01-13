import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetail } from './product-detail';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { SeoService } from '../../services/seo.service';
import { AnalyticsService } from '../../services/analytics.service';
import { of } from 'rxjs';
import { signal } from '@angular/core';

describe('ProductDetail Component', () => {
    let component: ProductDetail;
    let fixture: ComponentFixture<ProductDetail>;
    let productService: any;
    let seoService: any;
    let analyticsService: any;

    const mockProduct = {
        id: 'p1',
        title: 'Product 1',
        description: 'Desc 1',
        category: 'ERP',
        iconSvg: 'chart' as any,
        features: ['f1', 'f2', 'f3', 'f4'],
        images: ['img1.jpg', 'img2.jpg'],
        longDescription: 'Long'
    };

    beforeEach(async () => {
        productService = {
            getProductById: vi.fn(),
            getRelatedProducts: vi.fn()
        };
        seoService = {
            updateMetaTags: vi.fn()
        };
        analyticsService = {
            trackProductView: vi.fn()
        };

        productService.getProductById.mockReturnValue(mockProduct);
        productService.getRelatedProducts.mockReturnValue([]);

        await TestBed.configureTestingModule({
            imports: [ProductDetail],
            providers: [
                { provide: ProductService, useValue: productService },
                { provide: SeoService, useValue: seoService },
                { provide: AnalyticsService, useValue: analyticsService },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: 'p1' })
                    }
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductDetail);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load product data based on route id', () => {
        expect(component.productId()).toBe('p1');
        expect(component.product()).toEqual(mockProduct);
        expect(productService.getProductById).toHaveBeenCalledWith('p1');
    });

    it('should set SEO meta tags and track view on init', () => {
        expect(seoService.updateMetaTags).toHaveBeenCalled();
        expect(analyticsService.trackProductView).toHaveBeenCalled();
    });

    it('should navigate through product images', () => {
        expect(component.selectedImageIndex()).toBe(0);
        expect(component.selectedImage()).toBe('img1.jpg');

        component.nextImage();
        expect(component.selectedImageIndex()).toBe(1);
        expect(component.selectedImage()).toBe('img2.jpg');

        component.prevImage();
        expect(component.selectedImageIndex()).toBe(0);
    });

    it('should select a specific image', () => {
        component.selectImage(1);
        expect(component.selectedImageIndex()).toBe(1);
    });
});
