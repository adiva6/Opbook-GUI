import {User} from "../user/user";
import {Post} from "../post/post";

export class PostComment {
    public id: number;
    public submitter: User;
    public post: Post;
    public creationTime: Date;

    public constructor(public content: string) {
    }

    public static parseJson(data: any): PostComment {
        const comment = new PostComment(data.content);
        comment.id = data.id;

        if (data.user) {
            comment.submitter = User.parseJson(data.user);
        }

        if (data.post) {
            comment.post = Post.parseJson(data.post);
        }

        if (data.creationTime) {
            comment.creationTime = new Date(data.creationTime);
        }

        return comment;
    }

    public serialize(): object {
        return {
            'content': this.content
        };
    }
}
