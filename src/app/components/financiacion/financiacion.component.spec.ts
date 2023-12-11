import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanciacionComponent } from './financiacion.component';

describe('FinanciacionComponent', () => {
  let component: FinanciacionComponent;
  let fixture: ComponentFixture<FinanciacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinanciacionComponent]
    });
    fixture = TestBed.createComponent(FinanciacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
