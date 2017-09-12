import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Skill } from '../../../models/skill';
import { SkillGroup } from '../../../models/skillGroup';
import { SkillService } from '../../../services/skill.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-skill-edit',
  templateUrl: './skill-edit.component.html',
  styleUrls: ['./skill-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillEditComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  skillForm:FormGroup;
  skill:Skill;
  sgs:SkillGroup[];

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private ss:SkillService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.ss.getAllSkillGroups().subscribe((data) => {
      this.mode = "Query";
      this.sgs = data.json() as SkillGroup[];

      this.route.params.subscribe((params: Params) => {
        this.mode = "Query";
          this.ss.getSkill(params['key']).subscribe(resp => {
            this.skill = resp.json() as Skill;
            let selected = null;
            this.sgs.forEach(s => {
              if(s.name == this.skill.skillGroup.name) selected = s;
            });
            this.skillForm.setValue({
              name: this.skill.name,
              sg: selected
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
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.mode = "Indeterminate";
      this.inProgress = false;
    });
    
  }

  createForm(){
    this.skillForm = this.fb.group ({
      name: ['', Validators.required ],
      sg:['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.skillForm.valid){
      this.skill.name = this.skillForm.value.name;
      this.skill.skillGroup = this.skillForm.value.sg;
      this.ss.update(this.skill).subscribe(
        (data) => {
          this.skillForm.reset();
          this.router.navigate(['/skill/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.skillForm.reset();
    this.router.navigate(['/skill']);
  }

}
