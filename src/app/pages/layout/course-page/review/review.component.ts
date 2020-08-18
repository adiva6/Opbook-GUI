import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../../models/course/course';
import {CourseRatingService} from "../../../../services/course-rating/course-rating.service";
import {CourseRating} from "../../../../models/course-rating/course-rating";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() course: Course;
  private relevanceScore: number;
  private interestScore: number;
  private instructionScore: number;

  constructor(private courseRatingService: CourseRatingService) { }

  ngOnInit(): void {
  }

  submitRating(): void {
    const courseRating = new CourseRating(this.instructionScore, this.interestScore, this.relevanceScore);
    this.courseRatingService.submitCourseRating(this.course.courseSymbol, courseRating).subscribe();
  }

  onRateRelevance($event: number): void {
    this.relevanceScore = $event;
  }

  onRateInterest($event: number): void {
    this.interestScore = $event;
  }

  onRateInstruction($event: number): void {
    this.instructionScore = $event;
  }
}
