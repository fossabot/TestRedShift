import { TestBed } from '@angular/core/testing';

import { AdvSearchNewService } from './adv-search-new.service';

describe('AdvSearchNewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvSearchNewService = TestBed.get(AdvSearchNewService);
    expect(service).toBeTruthy();
  });
});
