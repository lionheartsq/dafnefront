import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionfinancieraComponent } from './simulacionfinanciera.component';

describe('SimulacionfinancieraComponent', () => {
  let component: SimulacionfinancieraComponent;
  let fixture: ComponentFixture<SimulacionfinancieraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulacionfinancieraComponent]
    });
    fixture = TestBed.createComponent(SimulacionfinancieraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
