import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosadicionalesComponent } from './gastosadicionales.component';

describe('GastosadicionalesComponent', () => {
  let component: GastosadicionalesComponent;
  let fixture: ComponentFixture<GastosadicionalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GastosadicionalesComponent]
    });
    fixture = TestBed.createComponent(GastosadicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
