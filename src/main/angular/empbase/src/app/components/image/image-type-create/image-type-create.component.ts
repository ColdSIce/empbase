import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-image-type-create',
  templateUrl: './image-type-create.component.html',
  styleUrls: ['./image-type-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ImageTypeCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
