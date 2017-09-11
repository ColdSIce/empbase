import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Office } from '../../../models/office';
import { OfficeService } from '../../../services/office.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OfficeComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  office:Office;

  constructor(
    private os:OfficeService,
    private ts:ToasterService,
    private route:ActivatedRoute, 
    private router:Router,) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.os.getOffice(params['key']).subscribe(resp => {
          this.office = resp.json() as Office;
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
    this.router.navigate(['/office/edit/' + id]);
  }

  delete(id:number){
    this.os.delete(id).subscribe(
      (resp) => this.router.navigate(['/officeAndLocation']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  toOffices(){
    this.router.navigate(['/officeAndLocation']);
  }

}
