import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemarklistComponent } from './remarklist.component';

describe('RemarklistComponent', () => {
  let component: RemarklistComponent;
  let fixture: ComponentFixture<RemarklistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemarklistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemarklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
