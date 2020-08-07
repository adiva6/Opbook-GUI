import { Component, OnInit } from '@angular/core';
import {tap} from 'rxjs/operators';
import {Course} from '../../../models/course/course';
import {CourseService} from '../../../services/course/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  public course: Course;

  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initCourse();
  }

  private initCourse(): void {
    const courseSymbol = this.route.snapshot.paramMap.get('courseSymbol');
    this.courseService.getCourseBySymbol(courseSymbol).pipe(
      tap(course => {
        this.course = course;
      })
    ).subscribe();
  }
}