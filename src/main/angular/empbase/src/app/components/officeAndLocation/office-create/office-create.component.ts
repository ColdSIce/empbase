import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-office-create',
  templateUrl: './office-create.component.html',
  styleUrls: ['./office-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OfficeCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
