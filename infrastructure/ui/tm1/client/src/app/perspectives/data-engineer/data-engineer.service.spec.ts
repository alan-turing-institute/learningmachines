import { TestBed } from '@angular/core/testing';

import { DataEngineerService } from './data-engineer.service';

describe('DataEngineerService', () => {
  let service: DataEngineerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataEngineerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
