import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Course} from '../../../../models/course/course';
import {PostService} from '../../../../services/post/post.service';
import {tap} from 'rxjs/operators';
import {Post} from '../../../../models/post/post';

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnChanges {
    @Input() course: Course;

    public posts: Post[];

    constructor(private postService: PostService) {
    }

    ngOnInit(): void {
        this.initPosts();
    }

    ngOnChanges(): void {
        this.initPosts();
    }

    private initPosts(): void {
        this.postService.getPostsByCourse(this.course.courseSymbol).pipe(
            tap(posts => this.posts = posts.sort((p1, p2) =>
                p2.creationTime.getTime() - p1.creationTime.getTime()))
        ).subscribe();
    }

    public updatePosts($event: Post): void {
        this.posts.unshift($event);
    }
}
