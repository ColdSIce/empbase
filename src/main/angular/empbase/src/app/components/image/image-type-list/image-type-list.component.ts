import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-image-type-list',
  templateUrl: './image-type-list.component.html',
  styleUrls: ['./image-type-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ImageTypeListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
