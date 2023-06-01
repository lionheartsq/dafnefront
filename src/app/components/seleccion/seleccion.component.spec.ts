import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionComponent } from './seleccion.component';

describe('SeleccionComponent', () => {
  let component: SeleccionComponent;
  let fixture: ComponentFixture<SeleccionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionComponent]
    });
    fixture = TestBed.createComponent(SeleccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
