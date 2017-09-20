import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { ImageService } from '../../../services/image.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class EmployeeListComponent implements OnInit {

  divSearchControl:FormControl;
  employeeSearchControl:FormControl;
  divIdSearchControl:FormControl;
  divisions:Division[];
  filteredDivisions: any;
  employees:Employee[];
  filteredEmployees: any;
  disabled:false;
  onlyActive:true;
  rendered:Employee[] = [];

  mode = "Indeterminate";
  inProgress = false;
  

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private ds:DivisionService,
    private es:EmployeeService,
    private is:ImageService,
    private ts:ToasterService) {
    this.inProgress = true;
    this.divSearchControl = new FormControl();
    this.employeeSearchControl = new FormControl();
    this.divIdSearchControl = new FormControl();
    
  }

  ngOnInit() {
    this.ds.getAllDivisions().subscribe((data) => {
      this.mode = "Query";
      this.divisions = data.json() as Division[];

      this.ds.getAllEmployeesByDivision(199).subscribe((data) => {
        this.mode = "Query";
        this.employees = data.json() as Employee[];
        this.fillRendered();

        this.filteredDivisions = this.divSearchControl.valueChanges
            .startWith(null)
            .map(name => this.filterDivs(name));

        this.filteredEmployees = this.employeeSearchControl.valueChanges
            .startWith(null)
            .map(name => this.filterEmpls(name));

        this.mode = "Indeterminate";
        this.inProgress = false;
      },(error) => {
        this.ts.pop('error', 'Ошибка', error);
      });

    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
    });
  }

  filterDivs(val: Division) {
    return val ? this.divisions.filter(d => d.id == val.id)
               : this.divisions;
  }

  filterEmpls(val: string) {
    return val ? this.employees.filter(e => e.fio == null ? false : e.fio.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.employees;
  }

  create(){
    this.router.navigate(['/employee/create']);
  }

  onEmployeeSearch(){
    
  }

  displayDivName(div:Division): string {
    if(div) return div.name;
  }

  fillRendered(){
    this.rendered = this.rendered.concat(this.employees.slice(this.rendered.length, this.rendered.length + 5))
  }
  
}
