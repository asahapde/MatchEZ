import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseApplicantsComponent } from './course-applicants.component';

describe('CourseApplicantsComponent', () => {
  let component: CourseApplicantsComponent;
  let fixture: ComponentFixture<CourseApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseApplicantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
