import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAndLocationListComponent } from './office-and-location-list.component';

describe('OfficeAndLocationListComponent', () => {
  let component: OfficeAndLocationListComponent;
  let fixture: ComponentFixture<OfficeAndLocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeAndLocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAndLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
