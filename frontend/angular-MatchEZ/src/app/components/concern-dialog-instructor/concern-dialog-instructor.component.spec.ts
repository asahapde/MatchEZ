import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConcernDialogInstructorComponent } from './concern-dialog-instructor.component';

describe('ConcernDialogInstructorComponent', () => {
  let component: ConcernDialogInstructorComponent;
  let fixture: ComponentFixture<ConcernDialogInstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConcernDialogInstructorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConcernDialogInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
