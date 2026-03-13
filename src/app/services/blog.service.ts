import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService, Language } from './language.service';

export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: Date;
    imageUrl: string;
    tags: string[];
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
    private http = inject(HttpClient);

    private postsData = signal<BlogPost[]>([]);

    private commentsSignal = signal<Comment[]>([]);

    constructor() {
        this.loadArticles();
    }

    private loadArticles() {
        this.http.get<any>('http://localhost:5000/api/articles?limit=100').subscribe({
            next: (res) => {
                if (res.data && res.data.articles) {
                    const mappedArticles = res.data.articles.map((a: any) => ({
                        id: a._id || a.id,
                        title: a.title,
                        excerpt: a.excerpt,
                        content: a.content,
                        author: a.author,
                        date: new Date(a.createdAt || a.date),
                        imageUrl: a.imageUrl || a.coverImage || '',
                        tags: a.tags
                    }));
                    this.postsData.set(mappedArticles);
                }
            },
            error: (err) => console.error('Error fetching articles', err)
        });
    }

    readonly posts = computed(() => {
        const lang = this.languageService.language();
        return this.postsData().map(post => this.translatePost(post, lang));
    });

    readonly comments = this.commentsSignal.asReadonly();

    private translatePost(post: BlogPost, lang: Language): TranslatedBlogPost {
        return {
            id: post.id,
            title: post.title || '',
            excerpt: post.excerpt || '',
            content: post.content || '',
            author: post.author || 'Admin',
            date: post.date,
            imageUrl: post.imageUrl || '',
            tags: post.tags || []
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
