import {Component, Input, OnInit} from '@angular/core';
import {Lecture} from '../../../../../models/lecture/lecture';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit {
  @Input() lecture: Lecture;
  public showCommentForm: boolean = false;
  public countComments: number;
  public showComments: boolean = false;
  private readonly YOUTUBE_URL = 'https://www.youtube.com/watch?';

  constructor() { }

  ngOnInit(): void {
  }

}
