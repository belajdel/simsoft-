import { Injectable, signal, computed, inject } from '@angular/core';
import { LanguageService, Language } from './language.service';

export interface MultiLang {
    fr: string;
    en: string;
}

export interface MultiLangArray {
    fr: string[];
    en: string[];
}

export interface BlogPost {
    id: string;
    title: MultiLang;
    excerpt: MultiLang;
    content: MultiLang;
    author: string;
    date: Date;
    imageUrl: string;
    tags: MultiLangArray;
}

export interface TranslatedBlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: Date;
    imageUrl: string;
    tags: string[];
}

export interface Comment {
    id: string;
    postId: string;
    user: string;
    text: string;
    date: Date;
}

@Injectable({
    providedIn: 'root'
})
export class BlogService {
    private languageService = inject(LanguageService);

    private postsData = signal<BlogPost[]>([
        {
            id: '1',
            title: {
                fr: 'La transformation numérique des PME : Guide complet 2025',
                en: 'Digital Transformation for SMEs: Complete 2025 Guide'
            },
            excerpt: {
                fr: 'Découvrez comment les PME peuvent réussir leur transformation digitale avec les bonnes stratégies et outils technologiques.',
                en: 'Discover how SMEs can succeed in their digital transformation with the right strategies and technological tools.'
            },
            content: {
                fr: `<h2>Introduction à la transformation digitale</h2>
<p>La transformation numérique n'est plus une option pour les PME en 2025...</p>
<h2>Les piliers de la transformation digitale</h2>
<ul>
<li><strong>L'automatisation des processus</strong></li>
<li><strong>L'intégration des données</strong></li>
<li><strong>L'expérience client digitale</strong></li>
<li><strong>La culture de l'innovation</strong></li>
</ul>
<h2>Conclusion</h2>
<p>Chez SimSoft, nous accompagnons nos clients à chaque étape.</p>`,
                en: `<h2>Introduction to Digital Transformation</h2>
<p>Digital transformation is no longer an option for SMEs in 2025. According to a recent study, 87% of SME leaders consider digitalization strategic for their survival.</p>
<h2>The Pillars of Digital Transformation</h2>
<ul>
<li><strong>Process Automation</strong>: Freeing up time for value-added tasks</li>
<li><strong>Data Integration</strong>: A unified view of the company</li>
<li><strong>Digital Customer Experience</strong>: Smooth and personalized interactions</li>
<li><strong>Innovation Culture</strong>: A mindset open to change</li>
</ul>
<h2>Conclusion</h2>
<p>At SimSoft, we accompany our clients at every stage: diagnosis, strategy, implementation, training and continuous optimization.</p>`
            },
            author: 'Amine Ben Ali',
            date: new Date('2025-01-15'),
            imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
            tags: {
                fr: ['Transformation Digitale', 'ERP', 'PME', 'Stratégie', 'Innovation'],
                en: ['Digital Transformation', 'ERP', 'SME', 'Strategy', 'Innovation']
            }
        },
        {
            id: '2',
            title: {
                fr: 'Cybersécurité 2025 : Les menaces émergentes et solutions',
                en: 'Cybersecurity 2025: Emerging Threats and Solutions'
            },
            excerpt: {
                fr: 'Guide complet pour protéger votre entreprise contre les cybermenaces modernes.',
                en: 'Complete guide to protect your business against modern cyber threats.'
            },
            content: {
                fr: `<h2>Le paysage des cybermenaces en 2025</h2>
<p>Les cyberattaques ont augmenté de 300% depuis 2020...</p>
<h2>L'approche Zero Trust</h2>
<p>Le modèle Zero Trust part du principe "Never trust, always verify"...</p>`,
                en: `<h2>The Cyber Threat Landscape in 2025</h2>
<p>Cyberattacks have increased by 300% since 2020 according to recent reports. SMEs represent 43% of victims.</p>
<h2>The Zero Trust Approach</h2>
<p>The Zero Trust model follows the principle "Never trust, always verify". It relies on continuous identification and granular control.</p>`
            },
            author: 'Sophie Mansouri',
            date: new Date('2025-01-22'),
            imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
            tags: {
                fr: ['Cybersécurité', 'Sophos', 'Zero Trust', 'Ransomware', 'Protection'],
                en: ['Cybersecurity', 'Sophos', 'Zero Trust', 'Ransomware', 'Protection']
            }
        }
    ]);

    private commentsSignal = signal<Comment[]>([
        { id: 'c1', postId: '1', user: 'Jean Dupont', text: 'Article très intéressant !', date: new Date() }
    ]);

    readonly posts = computed(() => {
        const lang = this.languageService.language();
        return this.postsData().map(post => this.translatePost(post, lang));
    });

    readonly comments = this.commentsSignal.asReadonly();

    private translatePost(post: BlogPost, lang: Language): TranslatedBlogPost {
        return {
            id: post.id,
            title: post.title[lang],
            excerpt: post.excerpt[lang],
            content: post.content[lang],
            author: post.author,
            date: post.date,
            imageUrl: post.imageUrl,
            tags: post.tags[lang]
        };
    }

    getPostById(id: string): TranslatedBlogPost | undefined {
        return this.posts().find(p => p.id === id);
    }

    getCommentsForPost(postId: string): Comment[] {
        return this.commentsSignal().filter(c => c.postId === postId);
    }

    addComment(postId: string, user: string, text: string) {
        const newComment: Comment = {
            id: Math.random().toString(36).substr(2, 9),
            postId,
            user,
            text,
            date: new Date()
        };
        this.commentsSignal.update(comments => [...comments, newComment]);
    }
}
