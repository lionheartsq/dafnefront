import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenideacionComponent } from './resumenideacion.component';

describe('ResumenideacionComponent', () => {
  let component: ResumenideacionComponent;
  let fixture: ComponentFixture<ResumenideacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenideacionComponent]
    });
    fixture = TestBed.createComponent(ResumenideacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
