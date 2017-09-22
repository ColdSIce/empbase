import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class EmployeeDetailsComponent implements OnInit {

  inProgress = true;
  employee:Employee;
  division:Division;
  patt:RegExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

  constructor(
    private es:EmployeeService,
    private ds:DivisionService,
    private ts:ToasterService,
    private route:ActivatedRoute, 
    private router:Router,) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
        this.es.getEmployee(params['key']).subscribe(resp => {
          this.employee = resp.json() as Employee;

          if(this.employee.divisionId) 
          this.ds.getDivision(this.employee.divisionId).subscribe(resp => {
            this.division = resp.json() as Division;
            this.inProgress = false;
          },
            (error) => {
              this.ts.pop('error', 'Ошибка', error);
              this.inProgress = false;
            }
          ); 

        },
          (error) => {
            this.ts.pop('error', 'Ошибка', error);
            this.inProgress = false;
          }
        ); 
      });
  }

  itIsEmail(str:string){
    return this.patt.test(str);
  }

  edit(id:number){
    this.router.navigate(['/employee/edit/' + id]);
  }

  delete(id:number){
    this.es.delete(id).subscribe(
      (resp) => this.router.navigate(['/employee']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  toEmployees(){
    this.router.navigate(['/employee']);
  }

}
