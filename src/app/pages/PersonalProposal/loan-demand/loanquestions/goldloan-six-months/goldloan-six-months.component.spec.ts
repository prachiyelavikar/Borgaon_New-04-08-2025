import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldloanSixMonthsComponent } from './goldloan-six-months.component';

describe('GoldloanSixMonthsComponent', () => {
  let component: GoldloanSixMonthsComponent;
  let fixture: ComponentFixture<GoldloanSixMonthsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldloanSixMonthsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldloanSixMonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
