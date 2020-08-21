import {Injectable} from '@angular/core';
import {PostComment} from '../../models/post-comment/post-comment';
import {Observable} from 'rxjs';
import {HttpHandler} from '../../utils/http/http-handler';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Post} from '../../models/post/post';

@Injectable()
export class PostCommentService {
    public constructor(private httpHandler: HttpHandler) {
    }

    public submitPostComment(courseSymbol: string, post: Post, postComment: PostComment): Observable<PostComment> {
        return this.httpHandler.post(environment.SERVER_ADDRESS,
            'courses/' + courseSymbol + '/posts/' + post.id + '/comments', postComment.serialize())
            .pipe(map(PostComment.parseJson));
    }
}
