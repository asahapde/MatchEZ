import { TestBed } from '@angular/core/testing';

import { ConcernsService } from './concerns.service';

describe('ConcernsService', () => {
  let service: ConcernsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConcernsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
