import {Injectable} from '@angular/core';
import {HttpHandler} from '../../utils/http/http-handler';
import {Observable} from 'rxjs';
import {Lecture} from '../../models/lecture/lecture';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class LectureService {
    public constructor(private httpHandler: HttpHandler) {
    }

    public getCourseLectures(courseSymbol: string): Observable<Lecture[]> {
        return this.httpHandler.get(environment.SERVER_ADDRESS,
            'courses/' + courseSymbol + '/lectures').pipe(
                map(rawLectures => rawLectures.map(Lecture.parseJson))
        );
    }

    public uploadLecture(courseSymbol: string, lecture: Lecture): Observable<Lecture> {
        return this.httpHandler.post(environment.SERVER_ADDRESS,
            'courses/' + courseSymbol + '/lectures', lecture.serialize()).pipe(
                map(Lecture.parseJson)
        );
    }
}
