import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Lecture} from '../../../../../../models/lecture/lecture';
import {LectureComment} from '../../../../../../models/lecture-comment/lecture-comment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {take, tap} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {LectureCommentService} from '../../../../../../services/lecture-comment/lecture-comment.service';

@Component({
  selector: 'app-lecture-comment-form',
  templateUrl: './lecture-comment-form.component.html',
  styleUrls: ['./lecture-comment-form.component.scss']
})
export class LectureCommentFormComponent implements OnInit {
  @Input() lecture: Lecture;
  @Input() videoDuration: number;
  @Output() commentSubmitted: EventEmitter<LectureComment> = new EventEmitter<LectureComment>();
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  public commentForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private ngZone: NgZone,
              private lectureCommentService: LectureCommentService) { }

  ngOnInit(): void {
    this.initCommentForm();
  }

  private initCommentForm(): void {
    this.commentForm = this.formBuilder.group({});
    this.commentForm.addControl('content', new FormControl(undefined, Validators.required));
    this.commentForm.addControl('referenceTime',
        new FormControl(undefined, Validators.max(this.videoDuration)));
  }

  public submitComment(): void {
    const contentControl = this.commentForm.get('content');
    if (this.commentForm.valid && !!contentControl.value) {
      const referenceTimeControl = this.commentForm.get('referenceTime');
      const comment = new LectureComment(contentControl.value, referenceTimeControl.value);
      this.lectureCommentService.submitLectureComment(this.lecture, comment).pipe(
          tap(submittedComment => {
            this.commentSubmitted.emit(submittedComment);
            this.commentForm.reset();
          })
      ).subscribe();
    }

    this.commentForm.reset();
  }

  private triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
}
