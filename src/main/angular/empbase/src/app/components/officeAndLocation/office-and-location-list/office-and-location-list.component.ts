import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Office } from '../../../models/office';
import { OfficeService } from '../../../services/office.service';
import { Location } from '../../../models/location';
import { LocationService } from '../../../services/location.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-office-and-location-list',
  templateUrl: './office-and-location-list.component.html',
  styleUrls: ['./office-and-location-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OfficeAndLocationListComponent implements OnInit {

  offices:Office[];
  locations:Location[];
  selectedOffice:Office;
  mode = "Indeterminate";
  inProgress = false;

  constructor(
    private router: Router,
    private os:OfficeService, 
    private es:EmployeeService,
    private ls:LocationService,
    private ts:ToasterService) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.os.getAll().subscribe((data) => {
      this.mode = "Query";
      this.offices = data.json() as Office[];
      this.mode = "Indeterminate";
      this.ls.getAll().subscribe((data) => {
        this.mode = "Query";
        this.locations = data.json() as Location[];
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

  selectOffice(office:Office){
    if(office === this.selectedOffice && this.selectedOffice !== undefined){
      if(this.selectedOffice) this.selectedOffice.selected = false;
      this.selectedOffice = null;
    }else{
      if(this.selectedOffice) this.selectedOffice.selected = false;
      this.selectedOffice = office;
      this.selectedOffice.selected = true;
    }
  }

  goToOffice(id:number){
    if(id) this.router.navigate(['/office/view/' + id]);
  }

  goToLoca(id:number){
    if(id) this.router.navigate(['/location/view/' + id]);
  }

  createOffice(){
    this.router.navigate(['/office/create']);
  }

  createLocation(id?:number){
    console.log(id);
    if(id) this.router.navigate(['/location/createInOffice/' + id]);
    else this.router.navigate(['/location/create']);
  }

}
