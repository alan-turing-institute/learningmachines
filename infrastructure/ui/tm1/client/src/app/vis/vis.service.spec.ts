import { TestBed } from '@angular/core/testing';

import { VisService } from './vis.service';

describe('VisService', () => {
  let service: VisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
