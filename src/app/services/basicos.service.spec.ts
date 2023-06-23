import { TestBed } from '@angular/core/testing';

import { BasicosService } from './basicos.service';

describe('BasicosService', () => {
  let service: BasicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
