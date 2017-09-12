import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Skill } from '../../../models/skill';
import { SkillService } from '../../../services/skill.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  skill:Skill;

  constructor(
    private ss:SkillService,
    private ts:ToasterService,
    private route:ActivatedRoute, 
    private router:Router,) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.ss.getSkill(params['key']).subscribe(resp => {
          this.skill = resp.json() as Skill;
          this.mode = "Indeterminate";
          this.inProgress = false;
        },
          (error) => {
            this.ts.pop('error', 'Ошибка', error);
            this.mode = "Indeterminate";
            this.inProgress = false;
          }
        ) 
      });
  }

  edit(id:number){
    this.router.navigate(['/skill/edit/' + id]);
  }

  delete(id:number){
    this.ss.delete(id).subscribe(
      (resp) => this.router.navigate(['/skill']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  toSkills(){
    this.router.navigate(['/skill']);
  }

}
