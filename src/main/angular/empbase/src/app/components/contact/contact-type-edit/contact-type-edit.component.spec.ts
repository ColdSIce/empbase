import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTypeEditComponent } from './contact-type-edit.component';

describe('ContactTypeEditComponent', () => {
  let component: ContactTypeEditComponent;
  let fixture: ComponentFixture<ContactTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
