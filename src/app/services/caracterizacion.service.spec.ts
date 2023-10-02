import { TestBed } from '@angular/core/testing';

import { CaracterizacionService } from './caracterizacion.service';

describe('CaracterizacionService', () => {
  let service: CaracterizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaracterizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
