import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estrategias1f10Component } from './estrategias1f10.component';

describe('Estrategias1f10Component', () => {
  let component: Estrategias1f10Component;
  let fixture: ComponentFixture<Estrategias1f10Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Estrategias1f10Component]
    });
    fixture = TestBed.createComponent(Estrategias1f10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
