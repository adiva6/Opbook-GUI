import {Component, Input, OnInit} from '@angular/core';
import {PostComment} from '../../../../../../models/post-comment/post-comment';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss']
})
export class PostCommentsComponent implements OnInit {
  @Input() comments: Array<PostComment>;

  constructor() { }

  ngOnInit(): void {
    this.comments.sort((c1, c2) =>
        c1.creationTime.getTime() - c2.creationTime.getTime());
  }

}
