import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTypeCreateComponent } from './image-type-create.component';

describe('ImageTypeCreateComponent', () => {
  let component: ImageTypeCreateComponent;
  let fixture: ComponentFixture<ImageTypeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTypeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
