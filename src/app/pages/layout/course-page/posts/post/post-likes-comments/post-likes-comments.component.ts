import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Post} from '../../../../../../models/post/post';

@Component({
  selector: 'app-post-likes-comments',
  templateUrl: './post-likes-comments.component.html',
  styleUrls: ['./post-likes-comments.component.scss']
})
export class PostLikesCommentsComponent implements OnInit, OnChanges {
  @Input() post: Post;
  public countLikes: number;
  public countComments: number;
  public showComments: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.countLikes = this.post.usersWhoLiked.length;
    this.countComments = this.post.comments.length;
  }

}
