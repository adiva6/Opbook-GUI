import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLikesCommentsComponent } from './post-likes-comments.component';

describe('PostLikesCommentsComponent', () => {
  let component: PostLikesCommentsComponent;
  let fixture: ComponentFixture<PostLikesCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostLikesCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostLikesCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
