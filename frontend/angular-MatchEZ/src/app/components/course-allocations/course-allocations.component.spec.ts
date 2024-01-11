import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAllocationsComponent } from './course-allocations.component';

describe('CourseAllocationsComponent', () => {
  let component: CourseAllocationsComponent;
  let fixture: ComponentFixture<CourseAllocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseAllocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAllocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
