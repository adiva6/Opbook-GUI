import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureCommentFormComponent } from './lecture-comment-form.component';

describe('LectureCommentFormComponent', () => {
  let component: LectureCommentFormComponent;
  let fixture: ComponentFixture<LectureCommentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureCommentFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureCommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
