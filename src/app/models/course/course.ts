import { User } from '../user/user';

export class Course {
  public students: User[];

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

    return course;
  }
}
