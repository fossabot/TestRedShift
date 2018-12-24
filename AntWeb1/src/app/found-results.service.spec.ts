import { TestBed } from '@angular/core/testing';

import { FoundResultsService } from './found-results.service';

describe('FoundResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoundResultsService = TestBed.get(FoundResultsService);
    expect(service).toBeTruthy();
  });
});
