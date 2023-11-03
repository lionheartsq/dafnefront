import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistacanvasComponent } from './vistacanvas.component';

describe('VistacanvasComponent', () => {
  let component: VistacanvasComponent;
  let fixture: ComponentFixture<VistacanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistacanvasComponent]
    });
    fixture = TestBed.createComponent(VistacanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
