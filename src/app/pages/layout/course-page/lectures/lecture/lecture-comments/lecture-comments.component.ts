import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LectureComment} from '../../../../../../models/lecture-comment/lecture-comment';

@Component({
  selector: 'app-lecture-comments',
  templateUrl: './lecture-comments.component.html',
  styleUrls: ['./lecture-comments.component.scss']
})
export class LectureCommentsComponent implements OnInit {
  @Input() comments: LectureComment[];
  @Output() jumpToReference: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    this.comments.sort((c1, c2) =>
        c1.creationTime.getTime() - c2.creationTime.getTime());
  }

}
