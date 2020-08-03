import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user/user';
import {tap} from 'rxjs/operators';
import {Course} from '../../../models/course/course';
import {MatSelectionList} from '@angular/material/list';
import {Router} from '@angular/router';
import {CourseService} from '../../../services/course/course.service';

@Component({
  selector: 'app-courses-menu',
  templateUrl: './courses-menu.component.html',
  styleUrls: ['./courses-menu.component.css']
})
export class CoursesMenuComponent implements OnInit, AfterViewInit {
  @Input() user: User;
  @ViewChild('menu') coursesMenu: MatSelectionList;

  public courses: Course[];
  public selectedCourses: Array<Course>;

  constructor(private courseService: CourseService, private router: Router) {
  }

  ngOnInit(): void {
    this.initCourses();
  }

  ngAfterViewInit(): void {
    this.coursesMenu.selectionChange.subscribe(_ => {
        if (this.selectedCourses) {
          this.navigateToCourse(this.selectedCourses[0]);
        }
      });
  }

  private navigateToCourse(selectedCourse: Course): void {
    this.courseService.setSelectedCourse(selectedCourse);
    this.router.navigateByUrl('/courses/' + selectedCourse.courseSymbol);
  }

  private initCourses(): void {
    this.courseService.getAllCourseOfStudent(this.user.id).pipe(
      tap(courses => {
        this.courses = courses;
      })
    ).subscribe();
  }

}
