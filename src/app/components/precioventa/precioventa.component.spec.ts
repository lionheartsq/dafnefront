import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioventaComponent } from './precioventa.component';

describe('PrecioventaComponent', () => {
  let component: PrecioventaComponent;
  let fixture: ComponentFixture<PrecioventaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecioventaComponent]
    });
    fixture = TestBed.createComponent(PrecioventaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
