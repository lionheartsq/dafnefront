import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicosComponent } from './basicos.component';

describe('BasicosComponent', () => {
  let component: BasicosComponent;
  let fixture: ComponentFixture<BasicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BasicosComponent]
    });
    fixture = TestBed.createComponent(BasicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
