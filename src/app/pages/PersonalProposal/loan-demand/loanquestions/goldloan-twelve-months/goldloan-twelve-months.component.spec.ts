import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldloanTwelveMonthsComponent } from './goldloan-twelve-months.component';

describe('GoldloanTwelveMonthsComponent', () => {
  let component: GoldloanTwelveMonthsComponent;
  let fixture: ComponentFixture<GoldloanTwelveMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldloanTwelveMonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldloanTwelveMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
