import { TestBed } from '@angular/core/testing';

import { AdvfindService } from './advfind.service';

describe('AdvfindService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdvfindService = TestBed.get(AdvfindService);
    expect(service).toBeTruthy();
  });
});
