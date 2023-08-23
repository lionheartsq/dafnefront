import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelocanvasComponent } from './modelocanvas.component';

describe('ModelocanvasComponent', () => {
  let component: ModelocanvasComponent;
  let fixture: ComponentFixture<ModelocanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModelocanvasComponent]
    });
    fixture = TestBed.createComponent(ModelocanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
