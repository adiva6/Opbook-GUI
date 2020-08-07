import {Course} from '../course/course';
import {User} from '../user/user';
import {PostComment} from '../post-comment/post-comment';

export class Post {
  public id: number;
  public course: Course;
  public submitter: User;
  public usersWhoLiked: Array<User>;
  public comments: Array<PostComment>;
  public creationTime: Date;

  constructor(public title: string,
              public content: string) {
  }

  public static parseJson(data: any): Post {
    const post = new Post(data.title, data.content);

    post.id = data.id;

    if (data.course) {
      post.course = Course.parseJson(data.course);
    }

    if (data.submitter) {
      post.submitter = User.parseJson(data.submitter);
    }

    if (data.comments) {
      post.comments = data.comments.map(PostComment.parseJson);
    } else {
      post.comments = [];
    }

    if (data.studentsWhoLiked) {
      post.usersWhoLiked = data.studentsWhoLiked.map(User.parseJson);
    } else {
      post.usersWhoLiked = [];
    }

    if (data.creationTime) {
      post.creationTime = new Date(data.creationTime);
    }

    return post;
  }

  public serialize(): object {
    return {
      'title': this.title,
      'content': this.content
    };
  }
}
