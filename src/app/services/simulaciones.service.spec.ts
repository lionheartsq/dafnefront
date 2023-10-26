import { TestBed } from '@angular/core/testing';

import { SimulacionesService } from './simulaciones.service';

describe('SimulacionesService', () => {
  let service: SimulacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
