import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { SkillGroup } from '../../../models/skillGroup';
import { SkillService } from '../../../services/skill.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-skill-type-edit',
  templateUrl: './skill-type-edit.component.html',
  styleUrls: ['./skill-type-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillTypeEditComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  sgForm:FormGroup;
  sg:SkillGroup;


  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private ss:SkillService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        this.mode = "Query";
          this.ss.getSkillGroup(params['key']).subscribe(resp => {
            this.sg = resp.json() as SkillGroup;
            this.sgForm.setValue({
              name: this.sg.name
            });
            this.mode = "Indeterminate";
            this.inProgress = false;
          },
            (error) => {
              this.ts.pop('error', 'Ошибка', error);
              this.inProgress = false;
              this.mode = "Indeterminate";
            }
          ) 
        });
  }

  createForm(){
    this.sgForm = this.fb.group ({
      name: ['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.sgForm.valid){
      this.sg.name = this.sgForm.value.name;
      this.ss.updateSkillGroup(this.sg).subscribe(
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
    this.router.navigate(['/skill']);
  }

}
