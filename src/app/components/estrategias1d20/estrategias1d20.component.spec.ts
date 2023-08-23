import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estrategias1d20Component } from './estrategias1d20.component';

describe('Estrategias1d20Component', () => {
  let component: Estrategias1d20Component;
  let fixture: ComponentFixture<Estrategias1d20Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Estrategias1d20Component]
    });
    fixture = TestBed.createComponent(Estrategias1d20Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
