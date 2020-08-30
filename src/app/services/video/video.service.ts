import {Injectable} from '@angular/core';
import {HttpHandler} from '../../utils/http/http-handler';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class VideoService {
    private readonly GOOGLE_API = 'https://www.googleapis.com';
    private readonly GOOGLE_API_KEY = 'AIzaSyCFf072bQGKxQcEmT7ecpyaTyXyzzKCOF0';
    private readonly YOUTUBE_RESOURCE = 'youtube/v3/videos';
    private token = 'CLC1yQEIl7bJAQijtskBCMS2yQEIqZ3KAQiXrMoBCIa1ygEImbXKAQjnyMoBCOnIygEI8MnKAQi0y8oBCJXWygE=';

    constructor(private httpHandler: HttpHandler) {
    }

    public checkIfVideoExists(videoId: string): Observable<boolean> {
        const headers = new HttpHeaders({'x-client-data': this.token});
        return this.httpHandler.get(this.GOOGLE_API, this.YOUTUBE_RESOURCE + '?id='
            + videoId + '&key=' + this.GOOGLE_API_KEY, {headers}).pipe(
            map(res => {
                return res && res.items && res.items.length > 0;
            })
        );
    }
}
