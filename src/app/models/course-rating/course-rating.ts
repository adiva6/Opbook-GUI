import {User} from '../user/user';
import {Course} from '../course/course';

export class CourseRating {
    public id: number;
    public submitter: User;
    public course: Course;

    public constructor(public instruction: number,
                       public interest: number,
                       public relevance: number) {
    }

    public static parseJson(data: any): CourseRating {
        const courseRating = new CourseRating(data.instruction, data.interest, data.relevance);
        courseRating.id = data.id;

        if (data.course) {
            courseRating.course = Course.parseJson(data.course);
        }

        if (data.user) {
            courseRating.submitter = User.parseJson(data.user);
        }

        return courseRating;
    }

    public serialize(): object {
        return {
            'interest': this.interest,
            'instruction': this.instruction,
            'relevance': this.relevance
        };
    }
}
