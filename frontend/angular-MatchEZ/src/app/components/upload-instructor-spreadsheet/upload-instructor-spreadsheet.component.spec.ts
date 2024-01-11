import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadInstructorSpreadsheetComponent } from './upload-instructor-spreadsheet.component';

describe('UploadInstructorSpreadsheetComponent', () => {
  let component: UploadInstructorSpreadsheetComponent;
  let fixture: ComponentFixture<UploadInstructorSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadInstructorSpreadsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadInstructorSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
