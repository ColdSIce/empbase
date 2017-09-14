import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionInListComponent } from './division-in-list.component';

describe('DivisionInListComponent', () => {
  let component: DivisionInListComponent;
  let fixture: ComponentFixture<DivisionInListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivisionInListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivisionInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
