import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableMappingComponent } from './table-mapping.component';

describe('TableMappingComponent', () => {
  let component: TableMappingComponent;
  let fixture: ComponentFixture<TableMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableMappingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
