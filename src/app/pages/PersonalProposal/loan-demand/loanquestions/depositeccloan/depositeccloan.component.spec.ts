import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositeccloanComponent } from './depositeccloan.component';

describe('DepositeccloanComponent', () => {
  let component: DepositeccloanComponent;
  let fixture: ComponentFixture<DepositeccloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositeccloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositeccloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
