import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimulacionlegalComponent } from './simulacionlegal.component';

describe('SimulacionlegalComponent', () => {
  let component: SimulacionlegalComponent;
  let fixture: ComponentFixture<SimulacionlegalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SimulacionlegalComponent]
    });
    fixture = TestBed.createComponent(SimulacionlegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
