import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicoformalizacionComponent } from './basicoformalizacion.component';

describe('BasicoformalizacionComponent', () => {
  let component: BasicoformalizacionComponent;
  let fixture: ComponentFixture<BasicoformalizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicoformalizacionComponent]
    });
    fixture = TestBed.createComponent(BasicoformalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
