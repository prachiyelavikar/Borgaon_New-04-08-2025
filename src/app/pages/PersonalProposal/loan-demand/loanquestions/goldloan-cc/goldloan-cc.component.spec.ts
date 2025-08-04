import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldloanCcComponent } from './goldloan-cc.component';

describe('GoldloanCcComponent', () => {
  let component: GoldloanCcComponent;
  let fixture: ComponentFixture<GoldloanCcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldloanCcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldloanCcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
