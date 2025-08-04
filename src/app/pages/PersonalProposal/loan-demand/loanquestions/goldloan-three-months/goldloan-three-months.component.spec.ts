import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldloanThreeMonthsComponent } from './goldloan-three-months.component';

describe('GoldloanThreeMonthsComponent', () => {
  let component: GoldloanThreeMonthsComponent;
  let fixture: ComponentFixture<GoldloanThreeMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldloanThreeMonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldloanThreeMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
