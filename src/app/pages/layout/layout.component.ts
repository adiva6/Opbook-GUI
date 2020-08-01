import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../services/course/course.service';
import {Course} from '../../models/course/course';
import {User} from '../../models/user/user';
import {AuthService} from '../../services/auth/auth.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  private user: User;
  public courses: Course[];

  constructor(private authService: AuthService, private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.initUser();
    this.initCourses();
  }

  private initUser(): void {
    this.authService.getUser().pipe(
      tap(user => {
        this.user = user;
      })
    ).subscribe();
  }

  private initCourses(): void {
    this.courseService.getAllCourseOfStudent(this.user.id).pipe(
      tap(courses => {
        this.courses = courses;
      })
    ).subscribe();
  }

}
