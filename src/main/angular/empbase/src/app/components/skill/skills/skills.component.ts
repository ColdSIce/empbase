import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Skill } from '../../../models/skill';
import { SkillGroup } from '../../../models/skillGroup';
import { SkillService } from '../../../services/skill.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillsComponent implements OnInit {

  sgs:SkillGroup[];
  skills:Skill[];
  selectedSG:SkillGroup;
  mode = "Indeterminate";
  inProgress = false;

  constructor(
    private router: Router,
    private ss:SkillService, 
    private ts:ToasterService) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.ss.getAllSkillGroups().subscribe((data) => {
      this.mode = "Query";
      this.sgs = data.json() as SkillGroup[];
      this.mode = "Indeterminate";
      this.ss.getAllSkills().subscribe((data) => {
        this.mode = "Query";
        this.skills = data.json() as Skill[];
        this.mode = "Indeterminate";
        this.inProgress = false;
      },(error) => {
        this.ts.pop('error', 'Ошибка', error);
        this.mode = "Indeterminate";
        this.inProgress = false;
      });

      this.mode = "Indeterminate";
      this.inProgress = false;
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.mode = "Indeterminate";
      this.inProgress = false;
    });
  }

  selectSG(sg:SkillGroup){
    if(sg === this.selectedSG && this.selectedSG !== undefined){
      if(this.selectedSG) this.selectedSG.selected = false;
      this.selectedSG = null;
    }else{
      if(this.selectedSG) this.selectedSG.selected = false;
      this.selectedSG = sg;
      this.selectedSG.selected = true;
    }
  }

  goToSG(id:number){
    if(id) this.router.navigate(['/skillType/view/' + id]);
  }

  goToSkill(id:number){
    if(id) this.router.navigate(['/skill/view/' + id]);
  }

  createSG(){
    this.router.navigate(['/skillType/create']);
  }

  createSkill(id?:number){
    if(id) this.router.navigate(['/skill/createInGroup/' + id]);
    else this.router.navigate(['/skill/create']);
  }

}
