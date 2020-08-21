import {Component, OnInit} from '@angular/core';
import {Course} from '../../../models/course/course';
import {tap} from 'rxjs/operators';
import {CourseService} from '../../../services/course/course.service';
import {User} from '../../../models/user/user';
import {AuthService} from '../../../services/auth/auth.service';

@Component({
  selector: 'app-courses-signup',
  templateUrl: './courses-signup.component.html',
  styleUrls: ['./courses-signup.component.scss']
})
export class CoursesSignupComponent implements OnInit {
  public courses: Course[];
  public user: User;

  constructor(private courseService: CourseService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.initUser();
    this.initCourses();
  }

  private initUser(): void {
    this.authService.getUser().pipe(
        tap( user => this.user = user)
    ).subscribe();
  }

  private initCourses(): void {
    const coursesPipe = tap((courses: Course[]) => {
      this.courses =
          courses.sort((c1, c2) => c1.name.localeCompare(c2.name));
    });

    this.courseService.getAllCourses().pipe(coursesPipe).subscribe();

  }

}
