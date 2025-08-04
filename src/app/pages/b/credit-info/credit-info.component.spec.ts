import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditInfoComponent } from './credit-info.component';

describe('CreditInfoComponent', () => {
  let component: CreditInfoComponent;
  let fixture: ComponentFixture<CreditInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreditInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
