import { TestBed } from '@angular/core/testing';

import { ResumenempresaService } from './resumenempresa.service';

describe('ResumenempresaService', () => {
  let service: ResumenempresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumenempresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
