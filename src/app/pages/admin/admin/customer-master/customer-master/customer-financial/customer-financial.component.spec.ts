import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFinancialComponent } from './customer-financial.component';

describe('CustomerFinancialComponent', () => {
  let component: CustomerFinancialComponent;
  let fixture: ComponentFixture<CustomerFinancialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerFinancialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFinancialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
