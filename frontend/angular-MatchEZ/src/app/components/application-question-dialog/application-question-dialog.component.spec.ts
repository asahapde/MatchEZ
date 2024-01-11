import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationQuestionDialogComponent } from './application-question-dialog.component';

describe('ApplicationQuestionDialogComponent', () => {
  let component: ApplicationQuestionDialogComponent;
  let fixture: ComponentFixture<ApplicationQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
