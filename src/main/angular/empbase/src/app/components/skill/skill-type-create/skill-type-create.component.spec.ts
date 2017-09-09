import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillTypeCreateComponent } from './skill-type-create.component';

describe('SkillTypeCreateComponent', () => {
  let component: SkillTypeCreateComponent;
  let fixture: ComponentFixture<SkillTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkillTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
