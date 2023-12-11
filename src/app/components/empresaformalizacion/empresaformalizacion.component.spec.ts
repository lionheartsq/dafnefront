import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaformalizacionComponent } from './empresaformalizacion.component';

describe('EmpresaformalizacionComponent', () => {
  let component: EmpresaformalizacionComponent;
  let fixture: ComponentFixture<EmpresaformalizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaformalizacionComponent]
    });
    fixture = TestBed.createComponent(EmpresaformalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
