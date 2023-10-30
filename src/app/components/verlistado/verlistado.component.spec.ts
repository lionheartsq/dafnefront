import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerlistadoComponent } from './verlistado.component';

describe('VerlistadoComponent', () => {
  let component: VerlistadoComponent;
  let fixture: ComponentFixture<VerlistadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerlistadoComponent]
    });
    fixture = TestBed.createComponent(VerlistadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
