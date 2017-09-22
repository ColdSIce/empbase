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
  onlyActive=true;
  rendered:Employee[] = [];
  selectedDiv:Division;
  selectedEmployee:Employee;
  stc:Division;

  mode = "Indeterminate";
  inProgress = true;
  

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
    this.ds.getFlatByRoot(85).subscribe((data) => {
      this.divisions = data.json() as Division[];

      this.selectedDiv = this.divisions.find(d => d.name === "ЦРТ");
      this.stc = this.selectedDiv;
      this.divSearchControl.setValue(this.selectedDiv);

      this.loadEmployees(this.selectedDiv == null ? 85 : this.selectedDiv.id, this.onlyActive);

    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
    });
  }

  loadEmployees(divId:number, active?:boolean, employee?:string, location?:string, office?:string, position?:string){
    this.inProgress = true;
    this.rendered = [];
    this.ds.getAllEmployeesByDivision(divId, active, employee, location, office, position).subscribe((data) => {
      this.employees = data.json() as Employee[];

      this.rendered = this.rendered.concat(this.employees.slice(this.rendered.length, this.rendered.length + 8))

      this.filteredDivisions = this.divSearchControl.valueChanges
          .startWith(null)
          .map(name => this.filterDivs(name));
          
      this.filteredEmployees = this.employeeSearchControl.valueChanges
          .startWith(null)
          .map(name => this.filterEmpls(name));

      this.inProgress = false;
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.inProgress = false;
    });
  }

  filterDivs(val: any) {
    if(typeof(val) == "object") return;
    return val ? this.divisions.filter(d => d.name.toUpperCase().indexOf(val.toUpperCase()) > -1)
               : this.divisions;
  }

  filterEmpls(val: any) {
    if(typeof(val) == "object") return;
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

  displayEmpName(emp:Employee):string{
    if(emp) return emp.fio;
  }

  fillRendered(){
    this.rendered = this.rendered.concat(this.employees.slice(this.rendered.length, this.rendered.length + 5))
  }

  activeChanged(){
    this.onlyActive = !this.onlyActive;
    this.loadEmployees(this.selectedDiv == null ? 85 : this.selectedDiv.id, this.onlyActive);
  }

  divisionSelected(){
    this.selectedDiv = this.divSearchControl.value;
    this.loadEmployees(this.selectedDiv == null ? 85 : this.selectedDiv.id, this.onlyActive);
  }

  employeeSelected(){
    console.log(this.employeeSearchControl.value);
    this.selectedEmployee = this.employeeSearchControl.value;
    this.loadEmployees(this.selectedDiv == null ? 85 : this.selectedDiv.id, this.onlyActive, this.selectedEmployee.uname);
  }

  dropSelectedDiv(){
    this.divSearchControl.setValue('');
  }

  dropSelectedEmp(){
    this.employeeSearchControl.setValue("");
    this.loadEmployees(this.selectedDiv == null ? 85 : this.selectedDiv.id, this.onlyActive);
  }
  
}
