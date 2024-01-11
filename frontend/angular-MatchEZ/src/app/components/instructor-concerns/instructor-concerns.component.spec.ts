import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorConcernsComponent } from './instructor-concerns.component';

describe('InstructorConcernsComponent', () => {
  let component: InstructorConcernsComponent;
  let fixture: ComponentFixture<InstructorConcernsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorConcernsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorConcernsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
