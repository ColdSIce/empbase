import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { DivisionInListComponent } from '../../division-in-list/division-in-list.component';

@Component({
  selector: 'app-division-list',
  templateUrl: './division-list.component.html',
  styleUrls: ['./division-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class DivisionListComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  division:Division;
  rootId:number = 85;

  constructor(private router: Router,
    private ds:DivisionService,
    private ts:ToasterService) {
    this.inProgress = true;
  }

  ngOnInit() {
    this.ds.getTreeByRoot(this.rootId).subscribe((data) => {
      this.mode = "Query";
      this.division = data.json() as Division;
      console.log(this.division);
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
    });
    this.mode = "Indeterminate";
    this.inProgress = false;
  }

  create(){
    this.router.navigate(['/division/create']);
  }

  goToDiv(id:number){
    if(id) this.router.navigate(['/division/view/' + id]);
  }

}
