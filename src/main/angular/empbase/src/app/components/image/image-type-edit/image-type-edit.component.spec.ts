import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTypeEditComponent } from './image-type-edit.component';

describe('ImageTypeEditComponent', () => {
  let component: ImageTypeEditComponent;
  let fixture: ComponentFixture<ImageTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
