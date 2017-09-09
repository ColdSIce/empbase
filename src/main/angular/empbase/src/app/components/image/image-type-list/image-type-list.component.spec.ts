import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTypeListComponent } from './image-type-list.component';

describe('ImageTypeListComponent', () => {
  let component: ImageTypeListComponent;
  let fixture: ComponentFixture<ImageTypeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTypeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
