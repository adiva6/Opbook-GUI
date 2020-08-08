import {Course} from '../course/course';

export class Lecture {
    public id: number;
    public creationTime: Date;
    public course: Course;

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

        return lecture;
    }

}
