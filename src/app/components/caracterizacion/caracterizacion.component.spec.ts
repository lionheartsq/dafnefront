import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracterizacionComponent } from './caracterizacion.component';

describe('CaracterizacionComponent', () => {
  let component: CaracterizacionComponent;
  let fixture: ComponentFixture<CaracterizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaracterizacionComponent]
    });
    fixture = TestBed.createComponent(CaracterizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
