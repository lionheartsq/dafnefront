import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizdofaComponent } from './matrizdofa.component';

describe('MatrizdofaComponent', () => {
  let component: MatrizdofaComponent;
  let fixture: ComponentFixture<MatrizdofaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrizdofaComponent]
    });
    fixture = TestBed.createComponent(MatrizdofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
