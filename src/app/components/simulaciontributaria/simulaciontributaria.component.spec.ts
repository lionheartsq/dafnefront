import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulaciontributariaComponent } from './simulaciontributaria.component';

describe('SimulaciontributariaComponent', () => {
  let component: SimulaciontributariaComponent;
  let fixture: ComponentFixture<SimulaciontributariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulaciontributariaComponent]
    });
    fixture = TestBed.createComponent(SimulaciontributariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
