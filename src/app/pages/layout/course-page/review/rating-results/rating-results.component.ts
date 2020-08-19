import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../../../models/course/course';

@Component({
  selector: 'app-rating-results',
  templateUrl: './rating-results.component.html',
  styleUrls: ['./rating-results.component.scss']
})
export class RatingResultsComponent implements OnInit {
  @Input() course: Course;
  public relevance = 0;
  public interest = 0;
  public instruction = 0;

  constructor() { }

  ngOnInit(): void {
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

    this.relevance = Math.ceil(relevanceSum / ratingsCount);
    this.instruction = Math.ceil(instructionSum / ratingsCount);
    this.interest = Math.ceil(interestSum / ratingsCount);
  }

  public get isCourseRated(): boolean {
    return this.course.ratings && this.course.ratings.length > 0;
  }
}
