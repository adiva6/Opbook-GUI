import { Course } from '../course/course';

export class User {
  public attendedCourses: Course[];

  constructor(public id: number,
              public name: string,
              public email: string,
              public isAdmin: boolean) {
  }

  public static parseJson(data: any): User {
    const user = new User(data.id, data.name, data.email, data.isAdmin);

    if (data.attendedCourses) {
      user.attendedCourses = data.attendedCourses.map(Course.parseJson);
    }

    return user;
  }
}
