import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaAllocationInstructorComponent } from './ta-allocation-instructor.component';

describe('TaAllocationInstructorComponent', () => {
  let component: TaAllocationInstructorComponent;
  let fixture: ComponentFixture<TaAllocationInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaAllocationInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaAllocationInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
