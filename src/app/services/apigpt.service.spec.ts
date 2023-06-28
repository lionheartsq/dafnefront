import { TestBed } from '@angular/core/testing';

import { ApigptService } from './apigpt.service';

describe('ApigptService', () => {
  let service: ApigptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApigptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
