import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course/course';
import {Observable, of} from 'rxjs';

@Injectable()
export class CourseService {
  private selectedCourse: Course;

  constructor(private httpClient: HttpClient) {
  }

  public getAllCourses(): Observable<Course[]> {
    return this.httpClient.get('/courses').pipe(
      map((rawCourses: any[]) => rawCourses.map(Course.parseJson))
    );
  }

  public getAllCourseOfStudent(userId: number): Observable<Course[]> {
    return this.httpClient.get('/users/' + userId + '/courses').pipe(
      map((rawCourses: any[]) => rawCourses.map(Course.parseJson))
    );
  }

  public getCourseBySymbol(courseSymbol: string): Observable<Course> {
    return this.httpClient.get('/courses/' + courseSymbol).pipe(
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
}
