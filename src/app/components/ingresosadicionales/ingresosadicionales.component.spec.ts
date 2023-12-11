import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosadicionalesComponent } from './ingresosadicionales.component';

describe('IngresosadicionalesComponent', () => {
  let component: IngresosadicionalesComponent;
  let fixture: ComponentFixture<IngresosadicionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IngresosadicionalesComponent]
    });
    fixture = TestBed.createComponent(IngresosadicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
