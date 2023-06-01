import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuenosComponent } from './suenos.component';

describe('SuenosComponent', () => {
  let component: SuenosComponent;
  let fixture: ComponentFixture<SuenosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuenosComponent]
    });
    fixture = TestBed.createComponent(SuenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
