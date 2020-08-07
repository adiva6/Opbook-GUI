import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Post} from '../../../../../models/post/post';
import {PostService} from '../../../../../services/post/post.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {take, tap} from "rxjs/operators";
import {AuthService} from "../../../../../services/auth/auth.service";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  @Input() courseSymbol: string;
  @Output() postSubmitted: EventEmitter<Post> = new EventEmitter<Post>();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public postForm: FormGroup;
  public username: string;

  constructor(private postService: PostService,
              private formBuilder: FormBuilder,
              private ngZone: NgZone,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getCachedUsername();
    this.initPostForm();
  }

  private initPostForm(): void {
    this.postForm = this.formBuilder.group({});
    this.postForm.addControl('title', new FormControl(undefined, Validators.required));
    this.postForm.addControl('content', new FormControl(undefined, Validators.required));
  }

  private triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public submitPost(): void {
    const post = new Post(this.postForm.get('title').value, this.postForm.get('content').value);
    this.postService.submitPost(this.courseSymbol, post).pipe(
        tap(newPost => this.postSubmitted.emit(newPost))
    ).subscribe();
    this.postForm.reset();
  }
}
