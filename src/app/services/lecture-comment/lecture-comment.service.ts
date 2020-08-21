import {Injectable} from '@angular/core';
import {HttpHandler} from '../../utils/http/http-handler';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {Lecture} from '../../models/lecture/lecture';
import {LectureComment} from '../../models/lecture-comment/lecture-comment';

@Injectable()
export class LectureCommentService {
    constructor(private httpHandler: HttpHandler) {

    }

    public submitLectureComment(courseSymbol: string, lecture: Lecture, lectureComment: LectureComment): Observable<LectureComment> {
        return this.httpHandler.post(environment.SERVER_ADDRESS,
            'courses/' + courseSymbol + '/lectures/' + lecture.id + '/comments', lectureComment.serialize())
            .pipe(map(LectureComment.parseJson));
    }

}
