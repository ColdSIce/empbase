import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTypeEditComponent } from './skill-type-edit.component';

describe('SkillTypeEditComponent', () => {
  let component: SkillTypeEditComponent;
  let fixture: ComponentFixture<SkillTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
