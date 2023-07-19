import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorhobbiesComponent } from './valorhobbies.component';

describe('ValorhobbiesComponent', () => {
  let component: ValorhobbiesComponent;
  let fixture: ComponentFixture<ValorhobbiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ValorhobbiesComponent]
    });
    fixture = TestBed.createComponent(ValorhobbiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
