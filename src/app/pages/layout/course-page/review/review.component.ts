import {Component, Input, OnInit} from '@angular/core';
import {Course} from '../../../../models/course/course';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() course: Course;

  constructor() { }

  ngOnInit(): void {
  }

}
