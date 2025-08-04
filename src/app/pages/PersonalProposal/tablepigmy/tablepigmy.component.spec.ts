import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablepigmyComponent } from './tablepigmy.component';

describe('TablepigmyComponent', () => {
  let component: TablepigmyComponent;
  let fixture: ComponentFixture<TablepigmyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablepigmyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablepigmyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
