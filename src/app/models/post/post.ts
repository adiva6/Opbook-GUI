import {Course} from '../course/course';
import {User} from '../user/user';

export class Post {
  public id: number;
  public course: Course;
  public submitter: User;
  public usersWhoLiked: Set<User>;

  constructor(public title: string,
              public content: string,
              public creationTime: Date) {
  }

  public static parseJson(data: any): Post {
    const post = new Post(data.title, data.content, data.creationTime);

    post.id = data.id;

    if (data.course) {
      post.course = Course.parseJson(data.course);
    }

    if (data.submitter) {
      post.submitter = User.parseJson(data.submitter);
    }

    if (data.studentsWhoLiked) {
      post.usersWhoLiked = data.studentsWhoLiked.map(User.parseJson);
    }

    return post;
  }
}
