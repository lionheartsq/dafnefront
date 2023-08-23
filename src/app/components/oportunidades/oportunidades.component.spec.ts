import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunidadesComponent } from './oportunidades.component';

describe('OportunidadesComponent', () => {
  let component: OportunidadesComponent;
  let fixture: ComponentFixture<OportunidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OportunidadesComponent]
    });
    fixture = TestBed.createComponent(OportunidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
