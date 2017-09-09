import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionCreateComponent } from './division-create.component';

describe('DivisionCreateComponent', () => {
  let component: DivisionCreateComponent;
  let fixture: ComponentFixture<DivisionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
