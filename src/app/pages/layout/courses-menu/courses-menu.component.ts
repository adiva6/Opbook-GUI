import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../../models/user/user';
import {tap} from 'rxjs/operators';
import {Course} from '../../../models/course/course';
import {CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-courses-menu',
  templateUrl: './courses-menu.component.html',
  styleUrls: ['./courses-menu.component.scss']
})
export class CoursesMenuComponent implements OnInit {
  @Input() user: User;

  public courses: Course[];

  constructor(private courseService: CourseService) {
  }

  ngOnInit(): void {
      this.initCourses();
      this.courseService.coursesChanges.subscribe(courses => this.courses = courses);
  }

  private initCourses(): void {
    const coursesPipe = tap((courses: Course[]) => {
      this.courses =
          courses.sort((c1, c2) => c1.name.localeCompare(c2.name));
    });

    let courseObservable$;

    if (this.user.isAdmin) {
      courseObservable$ = this.courseService.getAllCourses().pipe(coursesPipe);
    } else {
      courseObservable$ = this.courseService.getAllCourseOfStudent(this.user.id).pipe(coursesPipe);
    }

    courseObservable$.subscribe();
  }
}
