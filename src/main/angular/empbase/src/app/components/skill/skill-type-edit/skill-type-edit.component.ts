import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-skill-type-edit',
  templateUrl: './skill-type-edit.component.html',
  styleUrls: ['./skill-type-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillTypeEditComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
