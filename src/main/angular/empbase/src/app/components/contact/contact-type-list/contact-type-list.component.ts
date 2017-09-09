import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-contact-type-list',
  templateUrl: './contact-type-list.component.html',
  styleUrls: ['./contact-type-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ContactTypeListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
