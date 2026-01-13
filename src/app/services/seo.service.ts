import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';

export interface SeoConfig {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private document = inject(DOCUMENT);
  private meta = inject(Meta);
  private title = inject(Title);
  private platformId = inject(PLATFORM_ID);

  updateMetaTags(config: SeoConfig) {
    // Update page title
    this.title.setTitle(config.title);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'keywords', content: config.keywords?.join(', ') || '' });
    this.meta.updateTag({ name: 'author', content: config.author || 'SimSoft Technologies' });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:image', content: config.image || '/Logo.png' });
    this.meta.updateTag({ property: 'og:url', content: config.url || this.getCurrentUrl() });
    this.meta.updateTag({ property: 'og:type', content: config.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'SimSoft Technologies' });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: config.image || '/Logo.png' });

    // Article specific tags
    if (config.type === 'article') {
      if (config.author) {
        this.meta.updateTag({ property: 'article:author', content: config.author });
      }
      if (config.publishedTime) {
        this.meta.updateTag({ property: 'article:published_time', content: config.publishedTime });
      }
      if (config.modifiedTime) {
        this.meta.updateTag({ property: 'article:modified_time', content: config.modifiedTime });
      }
      if (config.section) {
        this.meta.updateTag({ property: 'article:section', content: config.section });
      }
      if (config.tags) {
        config.tags.forEach(tag => {
          this.meta.updateTag({ property: 'article:tag', content: tag });
        });
      }
    }

    // Canonical URL
    this.updateCanonicalUrl(config.url || this.getCurrentUrl());

    // Structured data
    this.addStructuredData(config);
  }

  private addStructuredData(config: SeoConfig) {
    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    const structuredData = this.generateStructuredData(config);

    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    this.document.head.appendChild(script);
  }

  private generateStructuredData(config: SeoConfig): any {
    const baseData = {
      '@context': 'https://schema.org',
      name: config.title,
      description: config.description,
      url: config.url || this.getCurrentUrl(),
      image: config.image || '/Logo.png'
    };

    if (config.type === 'product') {
      return {
        ...baseData,
        '@type': 'Product',
        brand: {
          '@type': 'Brand',
          name: 'SimSoft Technologies'
        },
        manufacturer: {
          '@type': 'Organization',
          name: 'SimSoft Technologies',
          address: {
            '@type': 'PostalAddress',
            addressCountry: 'TN',
            addressLocality: 'Sousse',
            postalCode: '4000',
            streetAddress: '5 Avenue Léopold Senghor, Espace Ayechi'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+216-73-21-36-88',
            contactType: 'customer service',
            availableLanguage: ['French', 'English']
          }
        },
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: 'SimSoft Technologies'
          }
        }
      };
    } else if (config.type === 'article') {
      return {
        ...baseData,
        '@type': 'Article',
        headline: config.title,
        author: {
          '@type': 'Person',
          name: config.author || 'SimSoft Technologies'
        },
        publisher: {
          '@type': 'Organization',
          name: 'SimSoft Technologies',
          logo: {
            '@type': 'ImageObject',
            url: '/Logo.png'
          }
        },
        datePublished: config.publishedTime,
        dateModified: config.modifiedTime
      };
    } else {
      // Default to Organization schema
      return {
        ...baseData,
        '@type': 'Organization',
        logo: '/Logo.png',
        sameAs: [
          'https://www.linkedin.com/company/simsoft-technologies',
          'https://github.com/simsoft-technologies'
        ],
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'TN',
          addressLocality: 'Sousse',
          postalCode: '4000',
          streetAddress: '5 Avenue Léopold Senghor, Espace Ayechi'
        },
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+216-73-21-36-88',
          contactType: 'customer service',
          availableLanguage: ['French', 'English']
        },
        foundingDate: '2000',
        description: 'Leading software development and IT consulting company specializing in ERP, GMAO, and cloud solutions.'
      };
    }
  }

  private updateCanonicalUrl(url: string) {
    let canonicalLink = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

    if (!canonicalLink) {
      canonicalLink = this.document.createElement('link');
      canonicalLink.rel = 'canonical';
      this.document.head.appendChild(canonicalLink);
    }

    canonicalLink.href = url;
  }

  private getCurrentUrl(): string {
    if (isPlatformBrowser(this.platformId)) {
      return window.location.href;
    }
    return '';
  }

  setPageTitle(title: string) {
    this.title.setTitle(title);
  }

  setMetaDescription(description: string) {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setMetaKeywords(keywords: string[]) {
    this.meta.updateTag({ name: 'keywords', content: keywords.join(', ') });
  }
}