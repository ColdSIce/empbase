import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTypeComponent } from './image-type.component';

describe('ImageTypeComponent', () => {
  let component: ImageTypeComponent;
  let fixture: ComponentFixture<ImageTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
