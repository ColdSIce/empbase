import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-contact-type-create',
  templateUrl: './contact-type-create.component.html',
  styleUrls: ['./contact-type-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ContactTypeCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
