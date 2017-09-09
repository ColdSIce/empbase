import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-office-and-location-list',
  templateUrl: './office-and-location-list.component.html',
  styleUrls: ['./office-and-location-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OfficeAndLocationListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
