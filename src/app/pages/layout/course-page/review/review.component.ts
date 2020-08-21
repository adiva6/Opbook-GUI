import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Course} from '../../../../models/course/course';
import {CourseRatingService} from "../../../../services/course-rating/course-rating.service";
import {tap} from "rxjs/operators";
import {Observable} from "rxjs";
import {User} from "../../../../models/user/user";
import {AuthService} from "../../../../services/auth/auth.service";
import {CourseRating} from "../../../../models/course-rating/course-rating";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnChanges {
  @Input() course: Course;
  private user: User;

  constructor(private courseRatingService: CourseRatingService, private authService: AuthService) { }

  ngOnInit(): void {
    this.initUser().subscribe();
  }

  ngOnChanges(): void {
    this.initUser().subscribe();
  }

  private initUser(): Observable<User> {
    return this.authService.getUser().pipe(
        tap(user => this.user = user));
  }

  public get isRatedByMe(): boolean {
    return this.course.ratings.some(rating => this.user && this.user.id === rating.submitter.id);
  }

  public onCourseRate($event: CourseRating): void {
    this.course.ratings.push($event);
  }
}
