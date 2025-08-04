import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerMultiComponent } from './customer-multi.component';

describe('CustomerMultiComponent', () => {
  let component: CustomerMultiComponent;
  let fixture: ComponentFixture<CustomerMultiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerMultiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
