import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-contact-type-edit',
  templateUrl: './contact-type-edit.component.html',
  styleUrls: ['./contact-type-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ContactTypeEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
