import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTableTemplateComponent } from './personal-table-template.component';

describe('PersonalTableTemplateComponent', () => {
  let component: PersonalTableTemplateComponent;
  let fixture: ComponentFixture<PersonalTableTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTableTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalTableTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
