import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-image-type-edit',
  templateUrl: './image-type-edit.component.html',
  styleUrls: ['./image-type-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ImageTypeEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
