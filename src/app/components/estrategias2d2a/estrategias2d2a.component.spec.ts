import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estrategias2d2aComponent } from './estrategias2d2a.component';

describe('Estrategias2d2aComponent', () => {
  let component: Estrategias2d2aComponent;
  let fixture: ComponentFixture<Estrategias2d2aComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Estrategias2d2aComponent]
    });
    fixture = TestBed.createComponent(Estrategias2d2aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
