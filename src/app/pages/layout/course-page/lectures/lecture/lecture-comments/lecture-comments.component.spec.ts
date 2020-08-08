import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectureCommentsComponent } from './lecture-comments.component';

describe('LectureCommentsComponent', () => {
  let component: LectureCommentsComponent;
  let fixture: ComponentFixture<LectureCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectureCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectureCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
