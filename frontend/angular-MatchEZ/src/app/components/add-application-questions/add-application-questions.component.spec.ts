import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddApplicationQuestionsComponent } from './add-application-questions.component';

describe('AddApplicationQuestionsComponent', () => {
  let component: AddApplicationQuestionsComponent;
  let fixture: ComponentFixture<AddApplicationQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddApplicationQuestionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddApplicationQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
