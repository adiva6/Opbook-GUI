import {Course} from '../course/course';
import {LectureComment} from '../lecture-comment/lecture-comment';

export class Lecture {
    public id: number;
    public creationTime: Date;
    public course: Course;
    public comments: LectureComment[];

    public constructor(public name: string,
                       public link: string) {
    }

    public static parseJson(data: any): Lecture {
        const lecture = new Lecture(data.name, data.link);
        lecture.id = data.id;

        if (data.course) {
            lecture.course = Course.parseJson(data.course);
        }

        if (data.creationTime) {
            lecture.creationTime = new Date(data.creationTime);
        }

        if (data.comments) {
            lecture.comments = data.comments.map(LectureComment.parseJson);
        } else {
            lecture.comments = [];
        }

        return lecture;
    }

}
