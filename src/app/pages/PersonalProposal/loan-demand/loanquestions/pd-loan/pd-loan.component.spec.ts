import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PDLoanComponent } from './pd-loan.component';

describe('PDLoanComponent', () => {
  let component: PDLoanComponent;
  let fixture: ComponentFixture<PDLoanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PDLoanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PDLoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
