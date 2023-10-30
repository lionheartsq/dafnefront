import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumensimulacionComponent } from './resumensimulacion.component';

describe('ResumensimulacionComponent', () => {
  let component: ResumensimulacionComponent;
  let fixture: ComponentFixture<ResumensimulacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumensimulacionComponent]
    });
    fixture = TestBed.createComponent(ResumensimulacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
