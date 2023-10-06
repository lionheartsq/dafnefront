import { TestBed } from '@angular/core/testing';

import { DofaService } from './dofa.service';

describe('DofaService', () => {
  let service: DofaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DofaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
