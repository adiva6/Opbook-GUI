import { User } from '../user/user';
import {CourseRating} from '../course-rating/course-rating';

export class Course {
  public students: User[];
  public ratings: CourseRating[];

  constructor(public id: number,
              public name: string,
              public courseSymbol: string,
              public creationTime: Date,
              public image: string) {
  }

  public static parseJson(data: any): Course {
    const course = new Course(data.id, data.name, data.courseSymbol, data.creationTime, data.image);

    if (data.students) {
      course.students = data.students.map(User.parseJson);
    } else {
      course.students = [];
    }

    if (data.ratings) {
      course.ratings = data.ratings.map(CourseRating.parseJson);
    } else {
      course.ratings = [];
    }

    return course;
  }
}
