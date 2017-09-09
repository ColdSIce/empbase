import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';

@Component({
  selector: 'app-skill-type-create',
  templateUrl: './skill-type-create.component.html',
  styleUrls: ['./skill-type-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillTypeCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
