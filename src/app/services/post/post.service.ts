import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../models/post/post';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
  constructor(private httpClient: HttpClient) {
  }

  public getPostsByCourse(courseId: number): Observable<Post[]> {
    return this.httpClient.get('/course/' + courseId + '/posts').pipe(
      map((rawPosts: any[]) => rawPosts.map(Post.parseJson))
    );
  }
}
