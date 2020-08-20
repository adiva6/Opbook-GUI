import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesSignupComponent } from './courses-signup.component';

describe('CoursesSignupComponent', () => {
  let component: CoursesSignupComponent;
  let fixture: ComponentFixture<CoursesSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
