import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../../models/course/course';
import {Post} from '../../../models/post/post';
import {PostService} from '../../../services/post/post.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  @Input() course: Course;
  public posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.initPosts();
  }

  private initPosts(): void {
    this.postService.getPostsByCourse(this.course.id).pipe(
      tap(posts => this.posts = posts)
    ).subscribe();
  }

}
