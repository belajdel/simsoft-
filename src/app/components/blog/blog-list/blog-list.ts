import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../services/blog.service';

@Component({
    selector: 'app-blog-list',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './blog-list.html',
    styleUrls: ['./blog-list.css']
})
export class BlogList {
    private blogService = inject(BlogService);

    posts = this.blogService.posts;
}
