import { TestBed, inject } from '@angular/core/testing';

import { ChangedDatesService } from './changed-dates.service';

describe('ChangedDatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChangedDatesService]
    });
  });

  it('should be created', inject([ChangedDatesService], (service: ChangedDatesService) => {
    expect(service).toBeTruthy();
  }));
});
