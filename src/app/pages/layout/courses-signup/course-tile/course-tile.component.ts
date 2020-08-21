import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../../models/course/course';
import {User} from '../../../../models/user/user';
import {CourseService} from '../../../../services/course/course.service';
import {catchError, tap} from 'rxjs/operators';
import {AlertService} from '../../../../services/alert/alert.service';
import {of} from 'rxjs';

@Component({
  selector: 'app-course-tile',
  templateUrl: './course-tile.component.html',
  styleUrls: ['./course-tile.component.scss']
})
export class CourseTileComponent implements OnInit {
  @Input() course: Course;
  @Input() user: User;

  constructor(private courseService: CourseService,
              private alertService: AlertService) { }

  ngOnInit(): void {
  }

  public get isEnrolled(): boolean {
    return this.course.students.some(user => this.user && this.user.id === user.id);
  }

  public leaveCourse(): void {
    this.courseService.leaveCourse(this.course.courseSymbol).pipe(
        tap(student => {
          const studentIndex = this.course.students.findIndex(u => u.id === this.user.id);
          this.course.students.splice(studentIndex);
        }),
        catchError(_ => {
          this.alertService.error('Failed leaving course');
          return of(undefined);
        })
    ).subscribe(_ => {
        this.courseService.getAllCourseOfStudent(this.user.id).subscribe();
    });
  }

  public joinCourse(): void {
    this.courseService.joinCourse(this.course.courseSymbol).pipe(
        tap(student => {
          this.course.students.push(student);
        }),
        catchError(_ => {
          this.alertService.error('Failed joining course');
          return of(undefined);
        })
    ).subscribe(_ => {
        this.courseService.getAllCourseOfStudent(this.user.id).subscribe();
    });
  }

}
