import { TestBed } from '@angular/core/testing';

import { FetchApplicationsService } from './fetch-applications.service';

describe('FetchApplicationsService', () => {
  let service: FetchApplicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchApplicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
