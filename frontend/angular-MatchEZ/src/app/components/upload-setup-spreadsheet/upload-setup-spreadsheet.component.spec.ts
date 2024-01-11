import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSetupSpreadsheetComponent } from './upload-setup-spreadsheet.component';

describe('UploadSetupSpreadsheetComponent', () => {
  let component: UploadSetupSpreadsheetComponent;
  let fixture: ComponentFixture<UploadSetupSpreadsheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSetupSpreadsheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSetupSpreadsheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
