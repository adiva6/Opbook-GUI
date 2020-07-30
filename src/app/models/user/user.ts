import { Course } from '../course/course';

export class User {
  public id: number;
  public attendedCourses: Course[];

  constructor(public name: string,
              public email: string,
              public isAdmin: boolean,
              public password?: string) {
  }

  public static parseJson(data: any): User {
    const user = new User(data.name, data.email, data.isAdmin);

    user.id = data.id;

    if (data.attendedCourses) {
      user.attendedCourses = data.attendedCourses.map(Course.parseJson);
    }

    return user;
  }

  public serialize(): object {
    return {
      'name': this.name,
      'email': this.email,
      'password': this.password,
      'isAdmin': this.isAdmin
    };
  }
}
