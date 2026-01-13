import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
    let service: ProductService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ProductService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return all products', () => {
        const products = service.getProducts();
        expect(products.length).toBeGreaterThan(0);
    });

    it('should get a product by id', () => {
        const product = service.getProductById('divalto');
        expect(product).toBeTruthy();
        expect(product?.title).toBe('Divalto ERP');
    });

    it('should return undefined for non-existent product id', () => {
        const product = service.getProductById('invalid');
        expect(product).toBeUndefined();
    });

    it('should return related products excluding the current one', () => {
        const currentId = 'divalto';
        const related = service.getRelatedProducts(currentId);
        expect(related.length).toBeLessThanOrEqual(3);
        expect(related.find(p => p.id === currentId)).toBeUndefined();
    });
});
