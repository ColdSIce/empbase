import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { SkillGroup } from '../../../models/skillGroup';
import { SkillService } from '../../../services/skill.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-skill-type-create',
  templateUrl: './skill-type-create.component.html',
  styleUrls: ['./skill-type-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillTypeCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  sgForm:FormGroup;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private ss:SkillService) {
      this.inProgress = true;
      this.createForm();
      this.inProgress = false;
    }

  ngOnInit() {

  }

  createForm(){
    this.sgForm = this.fb.group ({
      name: ['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.sgForm.valid){
      let sg:SkillGroup = new SkillGroup(
        this.sgForm.value.name
      );
      this.ss.createSkillGroup(sg).subscribe(
        (data) => {
          this.sgForm.reset();
          this.router.navigate(['/skillType/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.sgForm.reset();
    this.router.navigate(['/skills']);
  }

}
