import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Estrategias1f1aComponent } from './estrategias1f1a.component';

describe('Estrategias1f1aComponent', () => {
  let component: Estrategias1f1aComponent;
  let fixture: ComponentFixture<Estrategias1f1aComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Estrategias1f1aComponent]
    });
    fixture = TestBed.createComponent(Estrategias1f1aComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
