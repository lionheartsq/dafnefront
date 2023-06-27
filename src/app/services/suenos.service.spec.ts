import { TestBed } from '@angular/core/testing';

import { SuenosService } from './suenos.service';

describe('SuenosService', () => {
  let service: SuenosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuenosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
