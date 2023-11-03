import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaestrategiasComponent } from './vistaestrategias.component';

describe('VistaestrategiasComponent', () => {
  let component: VistaestrategiasComponent;
  let fixture: ComponentFixture<VistaestrategiasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VistaestrategiasComponent]
    });
    fixture = TestBed.createComponent(VistaestrategiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
