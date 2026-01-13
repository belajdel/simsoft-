import { Component, inject, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { BlogService } from '../../../services/blog.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-blog-detail',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterLink],
    templateUrl: './blog-detail.html',
    styleUrls: ['./blog-detail.css']
})
export class BlogDetail {
    private route = inject(ActivatedRoute);
    private blogService = inject(BlogService);
    
    routeId = input<string>('');
    private routeParams = toSignal(this.route.params);
    
    postId = computed(() => {
        const inputId = this.routeId();
        if (inputId) return inputId;
        const params = this.routeParams();
        return params ? params['id'] : '';
    });

    post = computed(() => {
        const id = this.postId();
        return id ? this.blogService.getPostById(id) : undefined;
    });

    comments = computed(() => {
        const p = this.post();
        return p ? this.blogService.getCommentsForPost(p.id) : [];
    });

    newCommentText = signal('');
    newCommentUser = signal('Anonyme');
    isSubmitting = signal(false);

    addComment() {
        const p = this.post();
        const text = this.newCommentText();
        const user = this.newCommentUser();

        if (p && text.trim() && !this.isSubmitting()) {
            this.isSubmitting.set(true);
            this.blogService.addComment(p.id, user, text);
            this.newCommentText.set('');
            
            // Reset submitting state after a brief delay
            setTimeout(() => {
                this.isSubmitting.set(false);
            }, 300);
        }
    }
}
