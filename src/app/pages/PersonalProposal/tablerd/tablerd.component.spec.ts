import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablerdComponent } from './tablerd.component';

describe('TablerdComponent', () => {
  let component: TablerdComponent;
  let fixture: ComponentFixture<TablerdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablerdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablerdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
