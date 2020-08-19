import {Injectable} from '@angular/core';
import {HttpHandler} from '../../utils/http/http-handler';
import {Observable} from 'rxjs';
import {CourseRating} from '../../models/course-rating/course-rating';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable()
export class CourseRatingService {
    constructor(private httpHandler: HttpHandler) {
    }

    public submitCourseRating(courseSymbol: string, courseRating: CourseRating): Observable<CourseRating> {
        return this.httpHandler.post(environment.SERVER_ADDRESS,
            'courses/' + courseSymbol + '/ratings', courseRating.serialize()).pipe(
                map(CourseRating.parseJson)
        );
    }
}
