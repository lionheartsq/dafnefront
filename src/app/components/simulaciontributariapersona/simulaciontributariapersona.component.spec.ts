import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulaciontributariapersonaComponent } from './simulaciontributariapersona.component';

describe('SimulaciontributariapersonaComponent', () => {
  let component: SimulaciontributariapersonaComponent;
  let fixture: ComponentFixture<SimulaciontributariapersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulaciontributariapersonaComponent]
    });
    fixture = TestBed.createComponent(SimulaciontributariapersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
