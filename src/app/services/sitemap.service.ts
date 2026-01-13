import { Injectable, inject } from '@angular/core';
import { ProductService } from './product.service';
import { BlogService } from './blog.service';

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

@Injectable({
  providedIn: 'root'
})
export class SitemapService {
  private productService = inject(ProductService);
  private blogService = inject(BlogService);

  private baseUrl = 'https://simsoft-technologies.com'; // Replace with your actual domain

  generateSitemap(): string {
    const urls = this.getAllUrls();
    return this.buildXmlSitemap(urls);
  }

  private getAllUrls(): SitemapUrl[] {
    const urls: SitemapUrl[] = [];

    // Static pages
    urls.push(
      { url: '/', priority: 1.0, changefreq: 'daily' },
      { url: '/about', priority: 0.8, changefreq: 'monthly' },
      { url: '/products', priority: 0.9, changefreq: 'weekly' },
      { url: '/partners', priority: 0.7, changefreq: 'monthly' },
      { url: '/contact', priority: 0.8, changefreq: 'monthly' },
      { url: '/blog', priority: 0.8, changefreq: 'daily' }
    );

    // Product pages
    const products = this.productService.getProducts();
    products.forEach(product => {
      urls.push({
        url: `/produits/${product.id}`,
        priority: 0.6,
        changefreq: 'weekly',
        lastmod: new Date().toISOString().split('T')[0] // Today's date
      });
    });

    // Blog posts
    const blogPosts = this.blogService.posts();
    blogPosts.forEach((post: any) => {
      urls.push({
        url: `/blog/${post.id}`,
        priority: 0.7,
        changefreq: 'monthly',
        lastmod: post.date.toISOString().split('T')[0]
      });
    });

    return urls;
  }

  private buildXmlSitemap(urls: SitemapUrl[]): string {
    const urlElements = urls.map(url => {
      return `  <url>
    <loc>${this.baseUrl}${url.url}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urlElements}
</urlset>`;
  }

  generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Block access to admin areas
Disallow: /admin/
Disallow: /api/private/

# Allow access to CSS, JS, and images
Allow: *.css
Allow: *.js
Allow: *.png
Allow: *.jpg
Allow: *.jpeg
Allow: *.gif
Allow: *.svg
Allow: *.ico

# Sitemap
Sitemap: ${this.baseUrl}/sitemap.xml

# Crawl delay (optional)
Crawl-delay: 1`;
  }

  // Generate sitemap index for multiple languages if needed
  generateMultilingualSitemap(): string {
    const languages = ['en', 'fr'];
    const sitemapUrls = languages.map(lang => {
      return `  <sitemap>
    <loc>${this.baseUrl}/sitemap-${lang}.xml</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls}
</sitemapindex>`;
  }
}