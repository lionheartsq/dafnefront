import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorsuenosComponent } from './valorsuenos.component';

describe('ValorsuenosComponent', () => {
  let component: ValorsuenosComponent;
  let fixture: ComponentFixture<ValorsuenosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValorsuenosComponent]
    });
    fixture = TestBed.createComponent(ValorsuenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
