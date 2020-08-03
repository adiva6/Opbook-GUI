import { Component, OnInit } from '@angular/core';
import {Post} from '../../../models/post/post';
import {tap} from 'rxjs/operators';
import {Course} from '../../../models/course/course';
import {PostService} from '../../../services/post/post.service';
import {CourseService} from '../../../services/course/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-page',
  templateUrl: './course-page.component.html',
  styleUrls: ['./course-page.component.scss']
})
export class CoursePageComponent implements OnInit {
  public course: Course;
  public posts: Post[];

  constructor(private courseService: CourseService, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initCourse();
  }

  private initCourse(): void {
    const courseSymbol = this.route.snapshot.paramMap.get('courseSymbol');
    this.courseService.getCourseBySymbol(courseSymbol).pipe(
      tap(course => {
        this.course = course;
        this.initPosts(course);
      })
    );
  }

  private initPosts(course: Course): void {
    this.postService.getPostsByCourse(course.courseSymbol).pipe(
      tap(posts => this.posts = posts)
    ).subscribe();
  }

}
