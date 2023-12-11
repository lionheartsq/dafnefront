import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaformalizacionComponent } from './personaformalizacion.component';

describe('PersonaformalizacionComponent', () => {
  let component: PersonaformalizacionComponent;
  let fixture: ComponentFixture<PersonaformalizacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonaformalizacionComponent]
    });
    fixture = TestBed.createComponent(PersonaformalizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
