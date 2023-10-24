import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistadofaComponent } from './vistadofa.component';

describe('VistadofaComponent', () => {
  let component: VistadofaComponent;
  let fixture: ComponentFixture<VistadofaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistadofaComponent]
    });
    fixture = TestBed.createComponent(VistadofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
