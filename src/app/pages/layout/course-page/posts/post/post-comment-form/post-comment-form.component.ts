import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Post} from '../../../../../../models/post/post';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take, tap} from 'rxjs/operators';
import {PostCommentService} from '../../../../../../services/post-comment/post-comment.service';
import {PostComment} from '../../../../../../models/post-comment/post-comment';
import {AuthService} from '../../../../../../services/auth/auth.service';
import {User} from '../../../../../../models/user/user';
import {Course} from "../../../../../../models/course/course";

@Component({
  selector: 'app-post-comment-form',
  templateUrl: './post-comment-form.component.html',
  styleUrls: ['./post-comment-form.component.scss']
})
export class PostCommentFormComponent implements OnInit {
  @Input() course: Course;
  @Input() post: Post;
  @Output() commentSubmitted: EventEmitter<PostComment> = new EventEmitter<PostComment>();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public commentForm: FormGroup;
  private user: User;

  constructor(private formBuilder: FormBuilder,
              private ngZone: NgZone,
              private postCommentService: PostCommentService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initCommentForm();
    this.initUser();
  }

  private initUser(): void {
    this.authService.getUser().pipe(
        tap(user => this.user = user)
    ).subscribe();
  }

  private initCommentForm(): void {
    this.commentForm = this.formBuilder.group({});
    this.commentForm.addControl('content', new FormControl(undefined, Validators.required));
  }

  private triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public submitComment(): void {
    const contentControl = this.commentForm.get('content');
    if (this.commentForm.valid && !!contentControl.value) {
      const comment = new PostComment(contentControl.value);
      this.postCommentService.submitPostComment(this.course.courseSymbol, this.post, comment).pipe(
          tap(submittedComment => {
            this.commentSubmitted.emit(submittedComment);
            this.commentForm.reset();
          })
        ).subscribe();
    }
    this.commentForm.reset();
  }
}
