import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RdloanComponent } from './rdloan.component';

describe('RdloanComponent', () => {
  let component: RdloanComponent;
  let fixture: ComponentFixture<RdloanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RdloanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RdloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
