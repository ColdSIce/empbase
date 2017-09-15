import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { SkillGroup } from '../../../models/skillGroup';
import { SkillService } from '../../../services/skill.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-skill-type',
  templateUrl: './skill-type.component.html',
  styleUrls: ['./skill-type.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class SkillTypeComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  sg:SkillGroup;

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
        this.ss.getSkillGroup(params['key']).subscribe(resp => {
          this.sg = resp.json() as SkillGroup;
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
    this.router.navigate(['/skillType/edit/' + id]);
  }

  delete(id:number){
    this.ss.deleteSkillGroup(id).subscribe(
      (resp) => this.router.navigate(['/skill']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  toSkills(){
    this.router.navigate(['/skill']);
  }

}
