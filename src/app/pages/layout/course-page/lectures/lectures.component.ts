import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../../models/course/course';

@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {
  @Input() course: Course;

  constructor() { }

  ngOnInit(): void {
  }

}
