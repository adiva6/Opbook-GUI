import {User} from '../user/user';
import {Lecture} from '../lecture/lecture';

export class LectureComment {
    public id: number;
    public submitter: User;
    public lecture: Lecture;
    public creationTime: Date;

    public constructor(public content: string,
                       public referenceTimeSeconds?: number) {
    }

    public static parseJson(data: any): LectureComment {
        const comment = new LectureComment(data.content);
        comment.id = data.id;
        comment.referenceTimeSeconds = data.referenceTimeSeconds;

        if (data.user) {
            comment.submitter = User.parseJson(data.user);
        }

        if (data.lecture) {
            comment.lecture = Lecture.parseJson(data.lecture);
        }

        if (data.creationTime) {
            comment.creationTime = new Date(data.creationTime);
        }

        return comment;
    }

    public serialize(): object {
        return {
            'content': this.content,
            'referenceTimeSeconds': this.referenceTimeSeconds
        };
    }
}
