import {Component, Input, OnInit} from '@angular/core';
import {LectureComment} from '../../../../../../models/lecture-comment/lecture-comment';

@Component({
  selector: 'app-lecture-comments',
  templateUrl: './lecture-comments.component.html',
  styleUrls: ['./lecture-comments.component.scss']
})
export class LectureCommentsComponent implements OnInit {
  @Input() comments: LectureComment[];

  constructor() { }

  ngOnInit(): void {
  }

}
