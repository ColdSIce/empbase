import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Position } from '../../../models/position';
import { PositionService } from '../../../services/position.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class PositionComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  position:Position;

  constructor(
    private ps:PositionService,
    private ts:ToasterService,
    private route:ActivatedRoute, 
    private router:Router,) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.ps.getPosition(params['key']).subscribe(resp => {
          this.position = resp.json() as Position;
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
    this.router.navigate(['/position/edit/' + id]);
  }

  delete(id:number){
    this.ps.delete(id).subscribe(
      (resp) => this.router.navigate(['/position']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  positions(){
    this.router.navigate(['/position']);
  }

}
