import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post/post';
import { map } from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {HttpHandler} from '../../utils/http/http-handler';

@Injectable()
export class PostService {
  constructor(private httpHandler: HttpHandler) {
  }

  public getPostsByCourse(courseSymbol: string): Observable<Post[]> {
    return this.httpHandler.get(environment.SERVER_ADDRESS, 'courses/' + courseSymbol + '/posts').pipe(
      map((rawPosts: any[]) => rawPosts.map(Post.parseJson))
    );
  }
}
