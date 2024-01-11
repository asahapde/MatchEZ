import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCourseSpreadsheetComponent } from './upload-course-spreadsheet.component';

describe('UploadCourseSpreadsheetComponent', () => {
  let component: UploadCourseSpreadsheetComponent;
  let fixture: ComponentFixture<UploadCourseSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCourseSpreadsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCourseSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
