import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {VideoService} from '../../../../../services/video/video.service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {LectureService} from "../../../../../services/lecture/lecture.service";
import {Course} from "../../../../../models/course/course";
import {Lecture} from "../../../../../models/lecture/lecture";
import {AlertService} from "../../../../../services/alert/alert.service";

@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.scss']
})
export class AddLectureComponent implements OnInit {
  @Input() course: Course;
  @Output() lectureUploaded: EventEmitter<Lecture> = new EventEmitter<Lecture>();
  public lectureForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private videoService: VideoService,
              private lectureService: LectureService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.initLectureForm();
  }

  private initLectureForm(): void {
    this.lectureForm = this.formBuilder.group({});
    this.lectureForm.addControl('title', new FormControl(undefined, Validators.required));
    this.lectureForm.addControl('videoId', new FormControl(undefined,
        Validators.required, this.videoValidator()));
  }

  public submitLecture(): void {
    const lecture = new Lecture(this.lectureForm.get('title').value, this.lectureForm.get('videoId').value);
    this.lectureService.uploadLecture(this.course.courseSymbol, lecture).pipe(
        tap(newLecture => {
          this.lectureUploaded.emit(lecture);
          this.lectureForm.reset();
        }),
        catchError(_ => {
          this.alertService.error('Lecture upload failed');
          return of(undefined);
        })
    ).subscribe();
  }

  private videoValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.videoService.checkIfVideoExists(control.value).pipe(
          map(res => {
            return res ? null : {videoDoesntExist: true};
          })
      );
    };
  }
}
