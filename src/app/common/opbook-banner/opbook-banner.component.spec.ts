import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpbookBannerComponent } from './opbook-banner.component';

describe('OpbookBannerComponent', () => {
  let component: OpbookBannerComponent;
  let fixture: ComponentFixture<OpbookBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpbookBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpbookBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
