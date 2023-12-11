import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntoequilibrioComponent } from './puntoequilibrio.component';

describe('PuntoequilibrioComponent', () => {
  let component: PuntoequilibrioComponent;
  let fixture: ComponentFixture<PuntoequilibrioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PuntoequilibrioComponent]
    });
    fixture = TestBed.createComponent(PuntoequilibrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
