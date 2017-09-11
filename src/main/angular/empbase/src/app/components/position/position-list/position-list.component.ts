import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { PositionComponent } from '../position/position.component';
import { Position } from '../../../models/position';
import { PositionService } from '../../../services/position.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class PositionListComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  positions:Position[] = [];

  constructor(private router: Router,
    private ps:PositionService,
    private ts:ToasterService) {
    this.inProgress = true;
  }

  ngOnInit() {
    this.ps.getAll().subscribe((data) => {
      this.mode = "Query";
      this.positions = data.json() as Position[];
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
    });
    this.mode = "Indeterminate";
    this.inProgress = false;
  }

  create(){
    this.router.navigate(['/position/create']);
  }

  goToPosition(orgId:number){
    if(orgId) this.router.navigate(['/position/view/' + orgId]);
  }

}
