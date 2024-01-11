import { TestBed } from '@angular/core/testing';

import { CourseInfoService } from './course-info.service';

describe('CourseInfoService', () => {
  let service: CourseInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
