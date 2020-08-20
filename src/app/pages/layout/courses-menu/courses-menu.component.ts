import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../models/user/user';
import {tap} from 'rxjs/operators';
import {Course} from '../../../models/course/course';
import {MatSelectionList} from '@angular/material/list';
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router} from '@angular/router';
import {CourseService} from '../../../services/course/course.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-courses-menu',
  templateUrl: './courses-menu.component.html',
  styleUrls: ['./courses-menu.component.scss']
})
export class CoursesMenuComponent implements OnInit {
  @Input() user: User;
  @ViewChild('menu') coursesMenu: MatSelectionList;

  public courses: Course[];

  constructor(private courseService: CourseService,
              private router: Router) {
  }

  ngOnInit(): void {
      this.initCourses().subscribe();
  }

  private initCourses(): Observable<Course[]> {
    const coursesPipe = tap((courses: Course[]) => {
      this.courses =
          courses.sort((c1, c2) => c1.name.localeCompare(c2.name));
    });

    if (this.user.isAdmin) {
      return this.courseService.getAllCourses().pipe(coursesPipe);
    } else {
      return this.courseService.getAllCourseOfStudent(this.user.id).pipe(coursesPipe);
    }
  }
}
