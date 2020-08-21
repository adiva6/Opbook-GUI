import {ChangeDetectorRef, Component, Input, OnChanges, OnInit} from '@angular/core';
import {Course} from '../../../../../models/course/course';

@Component({
  selector: 'app-rating-results',
  templateUrl: './rating-results.component.html',
  styleUrls: ['./rating-results.component.scss']
})
export class RatingResultsComponent implements OnInit, OnChanges {
  @Input() course: Course;
  public isScoreCalculated = false;
  public relevance = 0;
  public interest = 0;
  public instruction = 0;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initCourseScores();
  }

  ngOnChanges(): void {
    this.isScoreCalculated = false;
    this.cdRef.detectChanges();
    this.initCourseScores();
  }

  private initCourseScores(): void {
    const ratingsCount = this.course.ratings.length;

    if (ratingsCount === 0) {
      return;
    }

    let relevanceSum = 0;
    let interestSum = 0;
    let instructionSum = 0;
    this.course.ratings.forEach(courseRating => {
      relevanceSum += courseRating.relevance;
      interestSum += courseRating.interest;
      instructionSum += courseRating.instruction;
    });

    this.relevance = this.roundHalf(relevanceSum / ratingsCount);
    this.instruction = this.roundHalf(instructionSum / ratingsCount);
    this.interest = this.roundHalf(interestSum / ratingsCount);

    this.isScoreCalculated = true;
  }

  public get isCourseRated(): boolean {
    return this.course.ratings && this.course.ratings.length > 0;
  }

  private roundHalf(score: number): number {
    return +(Math.round(score * 2) / 2).toFixed(1);
  }
}
