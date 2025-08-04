import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialpigmydepositComponent } from './financialpigmydeposit.component';

describe('FinancialpigmydepositComponent', () => {
  let component: FinancialpigmydepositComponent;
  let fixture: ComponentFixture<FinancialpigmydepositComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancialpigmydepositComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialpigmydepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
