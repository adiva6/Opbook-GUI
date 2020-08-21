import {AfterViewInit, Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Lecture} from '../../../../../models/lecture/lecture';
import {VideoComponent} from '../../../../../common/video/video.component';
import {LectureComment} from '../../../../../models/lecture-comment/lecture-comment';

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: ['./lecture.component.scss']
})
export class LectureComponent implements OnInit, OnChanges {
  @Input() lecture: Lecture;
  @ViewChild('videoPlayer') videoPlayer: VideoComponent;
  public showCommentForm = false;
  public countComments: number;
  public showComments = false;
  public videoDuration: number;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.updateAmounts();
  }

  private updateAmounts(): void {
    this.countComments = this.lecture.comments.length;
  }

  public updateComments($event: LectureComment): void {
    this.lecture.comments.push($event);
    this.updateAmounts();
  }

  public updateDuration(): void {
    this.videoDuration = this.videoPlayer.getDuration();
  }
}
