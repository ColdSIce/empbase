import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-division-create',
  templateUrl: './division-create.component.html',
  styleUrls: ['./division-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class DivisionCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
