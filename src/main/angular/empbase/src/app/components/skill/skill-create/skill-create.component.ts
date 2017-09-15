import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Skill } from '../../../models/skill';
import { SkillGroup } from '../../../models/skillGroup';
import { SkillService } from '../../../services/skill.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-skill-create',
  templateUrl: './skill-create.component.html',
  styleUrls: ['./skill-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  skillForm:FormGroup;
  sgs:SkillGroup[];
  sg:SkillGroup;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private ss:SkillService,
    private route:ActivatedRoute) {
      this.inProgress = true;
      this.createForm();
      this.inProgress = false;
    }

  ngOnInit() {
    this.ss.getAllSkillGroups().subscribe((data) => {
      this.mode = "Query";
      this.sgs = data.json() as SkillGroup[];

      this.route.params.subscribe((params: Params) => {
        this.mode = "Query";
          if(params['skillId']){
            this.ss.getSkillGroup(params['skillId']).subscribe(resp => {
              this.sg = resp.json() as SkillGroup;
              let selected = null;
              this.sgs.forEach(s => {
                if(s.name == this.sg.name) selected = s;
              });
              this.skillForm.setValue({
                name: '',
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
          }
        });

      this.mode = "Indeterminate";
      this.inProgress = false;
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.mode = "Indeterminate";
      this.inProgress = false;
    });
  }

  createForm(){
    this.skillForm = this.fb.group ({
      name: ['', Validators.required ],
      sg: ['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.skillForm.valid){
      let skill:Skill = new Skill(
        this.skillForm.value.name,
        this.skillForm.value.sg
      );
      this.ss.create(skill).subscribe(
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
