import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Course } from '../../models/course/course';
import { Observable } from 'rxjs';

@Injectable()
export class CourseService {
  constructor(private httpClient: HttpClient) {
  }

  public getAllCourses(): Observable<Course[]> {
    return this.httpClient.get('/courses').pipe(
      map((rawCourses: any[]) => rawCourses.map(Course.parseJson))
    );
  }
}
