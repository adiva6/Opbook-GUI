import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CourseRating} from '../../../../../models/course-rating/course-rating';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {CourseRatingService} from '../../../../../services/course-rating/course-rating.service';
import {AlertService} from '../../../../../services/alert/alert.service';
import {Course} from "../../../../../models/course/course";

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.scss']
})
export class RateComponent implements OnInit {
  @Input() course: Course;
  @Output() courseRated: EventEmitter<CourseRating> = new EventEmitter<CourseRating>();
  private relevanceScore = 0;
  private interestScore = 0;
  private instructionScore = 0;

  constructor(private courseRatingService: CourseRatingService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  public submitRating(): void {
    const courseRating = new CourseRating(this.instructionScore, this.interestScore, this.relevanceScore);
    this.courseRatingService.submitCourseRating(this.course.courseSymbol, courseRating).pipe(
        tap(newCourseRating => this.courseRated.emit(newCourseRating)),
        catchError(err => {
          this.alertService.error('Invalid rating');
          return of(undefined);
        })
    ).subscribe();
  }

  public onRateRelevance($event: number): void {
    this.relevanceScore = $event;
  }

  public onRateInterest($event: number): void {
    this.interestScore = $event;
  }

  public onRateInstruction($event: number): void {
    this.instructionScore = $event;
  }

  public isRatingValid(): boolean {
    return this.isValidScore(this.interestScore) && this.isValidScore(this.instructionScore)
        && this.isValidScore(this.relevanceScore);
  }

  private isValidScore(score: number): boolean {
    return (score >= 1 && score <= 5);
  }

}
