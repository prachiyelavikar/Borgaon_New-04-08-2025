import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessGoldloanCcComponent } from './business-goldloan-cc.component';

describe('BusinessGoldloanCcComponent', () => {
  let component: BusinessGoldloanCcComponent;
  let fixture: ComponentFixture<BusinessGoldloanCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessGoldloanCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessGoldloanCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
