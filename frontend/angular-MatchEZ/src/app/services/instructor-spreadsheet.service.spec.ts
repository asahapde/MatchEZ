import { TestBed } from '@angular/core/testing';

import { InstructorSpreadsheetService } from './instructor-spreadsheet.service';

describe('InstructorSpreadsheetService', () => {
  let service: InstructorSpreadsheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstructorSpreadsheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
