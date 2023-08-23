import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FortalezasComponent } from './fortalezas.component';

describe('FortalezasComponent', () => {
  let component: FortalezasComponent;
  let fixture: ComponentFixture<FortalezasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FortalezasComponent]
    });
    fixture = TestBed.createComponent(FortalezasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
