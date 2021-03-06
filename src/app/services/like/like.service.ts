import {Injectable} from '@angular/core';
import {HttpHandler} from '../../utils/http/http-handler';
import {Post} from '../../models/post/post';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../../models/user/user';
import {map} from 'rxjs/operators';

@Injectable()
export class LikeService {
    public constructor(private httpHandler: HttpHandler) {
    }

    public likePost(courseSymbol: string, post: Post): Observable<User> {
        return this.httpHandler.post(environment.SERVER_ADDRESS,
            'courses/' + courseSymbol + '/posts/' + post.id + '/likes', {}).pipe(
                map(User.parseJson)
        );
    }

    public dislikePost(courseSymbol: string, post: Post): Observable<User> {
        return this.httpHandler.delete(environment.SERVER_ADDRESS,
            'courses/' + courseSymbol + '/posts/' + post.id + '/likes').pipe(
            map(User.parseJson)
        );
    }
}
