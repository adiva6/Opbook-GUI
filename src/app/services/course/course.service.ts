import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course/course';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpHandler} from '../../utils/http/http-handler';
import {User} from '../../models/user/user';

@Injectable()
export class CourseService {
  private selectedCourse: Course;

  constructor(private httpHandler: HttpHandler) {
  }

  public getAllCourses(): Observable<Course[]> {
    return this.httpHandler.get(environment.SERVER_ADDRESS, 'courses').pipe(
      map((rawCourses: any[]) => rawCourses.map(Course.parseJson))
    );
  }

  public getAllCourseOfStudent(userId: number): Observable<Course[]> {
    return this.httpHandler.get(environment.SERVER_ADDRESS, 'users/' + userId + '/courses').pipe(
      map((rawCourses: any[]) => rawCourses.map(Course.parseJson))
    );
  }

  public getCourseBySymbol(courseSymbol: string): Observable<Course> {
    return this.httpHandler.get(environment.SERVER_ADDRESS, 'courses/' + courseSymbol).pipe(
      map(Course.parseJson)
    );
  }

  public setSelectedCourse(course: Course): void {
    this.selectedCourse = course;
  }

  public getSelectedCourse(courseSymbol: string): Observable<Course> {
    if (this.selectedCourse && this.selectedCourse.courseSymbol === courseSymbol) {
      return of(this.selectedCourse);
    }

    return this.getCourseBySymbol(courseSymbol);
  }

  public joinCourse(courseSymbol: string): Observable<User> {
    return this.httpHandler.post(environment.SERVER_ADDRESS,
        'courses/' + courseSymbol + '/students', {}).pipe(
        map(User.parseJson)
    );
  }

  public leaveCourse(courseSymbol: string): Observable<User> {
    return this.httpHandler.delete(environment.SERVER_ADDRESS,
        'courses/' + courseSymbol + '/students').pipe(
            map(User.parseJson)
    );
  }
}
