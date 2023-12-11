import { TestBed } from '@angular/core/testing';

import { FormalizacionService } from './formalizacion.service';

describe('FormalizacionService', () => {
  let service: FormalizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormalizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
