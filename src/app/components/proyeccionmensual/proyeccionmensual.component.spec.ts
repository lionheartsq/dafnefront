import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyeccionmensualComponent } from './proyeccionmensual.component';

describe('ProyeccionmensualComponent', () => {
  let component: ProyeccionmensualComponent;
  let fixture: ComponentFixture<ProyeccionmensualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProyeccionmensualComponent]
    });
    fixture = TestBed.createComponent(ProyeccionmensualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
