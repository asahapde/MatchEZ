import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadApplicantSpreadsheetComponent } from './upload-applicant-spreadsheet.component';

describe('UploadApplicatSpreadsheetComponent', () => {
  let component: UploadApplicantSpreadsheetComponent;
  let fixture: ComponentFixture<UploadApplicantSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadApplicantSpreadsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadApplicantSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
