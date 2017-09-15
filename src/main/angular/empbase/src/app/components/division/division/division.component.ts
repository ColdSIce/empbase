import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class DivisionComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  division:Division;
  rootDivision:Division;

  constructor(
    private ds:DivisionService,
    private ts:ToasterService,
    private route:ActivatedRoute, 
    private router:Router,) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.ds.getDivision(params['key']).subscribe(resp => {
          this.division = resp.json() as Division;

          if(this.division.id) this.ds.getDivision(this.division.id).subscribe(resp => {
            this.rootDivision = resp.json() as Division;
            this.mode = "Indeterminate";
            this.inProgress = false;
          },
            (error) => {
              this.ts.pop('error', 'Ошибка', error);
              this.mode = "Indeterminate";
              this.inProgress = false;
            }
          ); 
        },
          (error) => {
            this.ts.pop('error', 'Ошибка', error);
            this.mode = "Indeterminate";
            this.inProgress = false;
          }
        ); 
      });
  }

  edit(id:number){
    this.router.navigate(['/division/edit/' + id]);
  }

  delete(id:number){
    this.ds.delete(id).subscribe(
      (resp) => this.router.navigate(['/division']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  toDivisions(){
    this.router.navigate(['/division']);
  }

}
