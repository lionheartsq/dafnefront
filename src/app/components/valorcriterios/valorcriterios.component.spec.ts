import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorcriteriosComponent } from './valorcriterios.component';

describe('ValorcriteriosComponent', () => {
  let component: ValorcriteriosComponent;
  let fixture: ComponentFixture<ValorcriteriosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValorcriteriosComponent]
    });
    fixture = TestBed.createComponent(ValorcriteriosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
