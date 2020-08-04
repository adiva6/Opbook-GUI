import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../../models/course/course';
import {PostService} from '../../../../services/post/post.service';
import {tap} from 'rxjs/operators';
import {Post} from '../../../../models/post/post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() course: Course;

  public posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.initPosts();
  }

  private initPosts(): void {
    this.postService.getPostsByCourse(this.course.courseSymbol).pipe(
      tap(posts => this.posts = posts)
    ).subscribe();
  }

}
