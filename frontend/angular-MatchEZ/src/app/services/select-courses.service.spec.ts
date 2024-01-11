import { TestBed } from '@angular/core/testing';

import { SelectCoursesService } from './select-courses.service';

describe('SelectCoursesService', () => {
  let service: SelectCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
