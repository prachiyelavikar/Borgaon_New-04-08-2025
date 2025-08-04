import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerPropertyComponent } from './customer-property.component';

describe('CustomerPropertyComponent', () => {
  let component: CustomerPropertyComponent;
  let fixture: ComponentFixture<CustomerPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerPropertyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
