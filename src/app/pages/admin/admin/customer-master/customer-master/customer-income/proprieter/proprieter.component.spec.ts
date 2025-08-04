import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProprieterComponent } from './proprieter.component';

describe('ProprieterComponent', () => {
  let component: ProprieterComponent;
  let fixture: ComponentFixture<ProprieterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProprieterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProprieterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
