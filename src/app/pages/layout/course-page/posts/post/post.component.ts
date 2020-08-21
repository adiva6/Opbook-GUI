import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Post} from '../../../../../models/post/post';
import {LikeService} from '../../../../../services/like/like.service';
import {PostComment} from '../../../../../models/post-comment/post-comment';
import {catchError, finalize, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {AlertService} from '../../../../../services/alert/alert.service';
import {AuthService} from '../../../../../services/auth/auth.service';
import {User} from '../../../../../models/user/user';
import {TimeAgoExtendsPipe} from '../../../../../pipes/time-ago-pipe';
import {Course} from '../../../../../models/course/course';


@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit, OnChanges {
    @Input() course: Course;
    @Input() post: Post;
    public showCommentForm = false;
    public showComments = false;
    public countLikes: number;
    public countComments: number;
    public showLike: boolean;
    private user: User;

    constructor(private likeService: LikeService,
                private alertService: AlertService,
                private authService: AuthService) {
    }

    ngOnInit(): void {
        this.initUser().subscribe();
        this.showLike = !this.isLikedByMe;
    }

    ngOnChanges(): void {
        this.updateAmounts();
    }

    private initUser(): Observable<User> {
        return this.authService.getUser().pipe(
            tap(user => this.user = user));
    }

    public get isLikedByMe(): boolean {
        return this.post.usersWhoLiked.some(user => this.user && this.user.id === user.id);
    }

    public likePost(): void {
        this.likeService.likePost(this.course.courseSymbol, this.post).pipe(
            tap(user => {
                this.post.usersWhoLiked.push(user);
                this.updateAmounts();
            }),
            catchError(err => {
                this.alertService.error(err.error);
                return of(undefined);
            }),
            finalize(() => {
                this.showLike = !this.isLikedByMe;
            })
        ).subscribe();
    }

    private updateAmounts(): void {
        this.countLikes = this.post.usersWhoLiked.length;
        this.countComments = this.post.comments.length;
    }

    public updateComments($event: PostComment): void {
        this.post.comments.push($event);
        this.updateAmounts();
    }

    public dislikePost(): void {
        this.likeService.dislikePost(this.course.courseSymbol, this.post).pipe(
            tap(user => {
                this.post.usersWhoLiked = this.post.usersWhoLiked.filter(u => u.id !== user.id);
                this.updateAmounts();
            }),
            catchError(err => {
                this.alertService.error(err.error);
                return of(undefined);
            }),
            finalize(() => {
                this.showLike = !this.isLikedByMe;
            })
        ).subscribe();
    }
}
