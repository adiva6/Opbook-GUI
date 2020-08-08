import {Component, EventEmitter, Input, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {Lecture} from '../../../../../../models/lecture/lecture';
import {LectureComment} from '../../../../../../models/lecture-comment/lecture-comment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {take, tap} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {LectureCommentService} from '../../../../../../services/lecture-comment/lecture-comment.service';
import {VideoComponent} from '../../../../../../common/video/video.component';
import {AlertService} from '../../../../../../services/alert/alert.service';

@Component({
    selector: 'app-lecture-comment-form',
    templateUrl: './lecture-comment-form.component.html',
    styleUrls: ['./lecture-comment-form.component.scss']
})
export class LectureCommentFormComponent implements OnInit {
    @Input() lecture: Lecture;
    @Input() player: VideoComponent;
    @Output() commentSubmitted: EventEmitter<LectureComment> = new EventEmitter<LectureComment>();
    @ViewChild('autosize') autosize: CdkTextareaAutosize;
    public commentForm: FormGroup;
    private totalReferenceTimeSeconds: number;

    constructor(private formBuilder: FormBuilder,
                private ngZone: NgZone,
                private lectureCommentService: LectureCommentService,
                private alertService: AlertService) {
    }

    ngOnInit(): void {
        this.initCommentForm();
    }

    private initCommentForm(): void {
        this.commentForm = this.formBuilder.group({});
        this.commentForm.addControl('content', new FormControl(undefined, Validators.required));
        this.commentForm.addControl('referenceTimeHours',
            new FormControl(undefined, [Validators.min(0), Validators.max(23)]));
        this.commentForm.addControl('referenceTimeMinutes',
            new FormControl(undefined, [Validators.min(0), Validators.max(59)]));
        this.commentForm.addControl('referenceTimeSeconds',
            new FormControl(undefined, [Validators.min(0), Validators.max(59)]));
    }

    public submitComment(): void {
        const contentControl = this.commentForm.get('content');
        this.totalReferenceTimeSeconds = this.calculateReferenceTime();

        if (this.totalReferenceTimeSeconds === 0) {
            this.totalReferenceTimeSeconds = undefined;
        }

        if (!this.commentForm.valid || !contentControl.value || !this.isReferenceTimeValid(this.totalReferenceTimeSeconds)) {
            this.alertService.error('Invalid comment!');
            return;
        }

        const comment = new LectureComment(contentControl.value, this.totalReferenceTimeSeconds);
        this.lectureCommentService.submitLectureComment(this.lecture, comment).pipe(
            tap(submittedComment => {
                this.commentSubmitted.emit(submittedComment);
                this.totalReferenceTimeSeconds = 0;
                this.commentForm.reset();
            })
        ).subscribe();

        this.commentForm.reset();
    }

    private calculateReferenceTime(): number {
        const seconds = this.commentForm.get('referenceTimeSeconds').value ?
            this.commentForm.get('referenceTimeSeconds').value : 0;
        const minutes = this.commentForm.get('referenceTimeMinutes').value ?
            this.commentForm.get('referenceTimeMinutes').value : 0;
        const hours = this.commentForm.get('referenceTimeHours').value ?
            this.commentForm.get('referenceTimeHours').value : 0;

        return (hours * 60 * 60) + (minutes * 60) + seconds;
    }

    private isReferenceTimeValid(referenceTime: number): boolean {
        if (!referenceTime) {
            return true;
        }

        if (referenceTime && referenceTime < this.player.getDuration()) {
            return true;
        }

        return false;
    }

    private triggerResize(): void {
        // Wait for changes to be applied, then trigger textarea resize.
        this.ngZone.onStable.pipe(take(1))
            .subscribe(() => this.autosize.resizeToFitContent(true));
    }
}
