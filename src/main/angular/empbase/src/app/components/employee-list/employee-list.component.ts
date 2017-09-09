import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../../components/employee/employee.component';
import { EmployeeEditComponent } from '../../components/employee-edit/employee-edit.component';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class EmployeeListComponent implements OnInit {

  divSearchControl:FormControl;
  employeeSearchForm:FormGroup;
  divisions:string[] = ['ЦРТ', 
  'Финансовый департамент', 
  'Управление по работе с персоналом', 
  'Коммерческий департамент', 
  'Департамент управления проектами', 
  'Департамент разработки', 
  'Продуктовое управление систем записи итп', 
  'Управление IT', 
  'Управление по производству', 
  'Управление по контролю качества', 
  'Склад готовой продукции', 
  'Филиал в г.Москва', 
  'Департамент СТС'];
  filteredDivisions: any;
  mode = "Indeterminate";
  inProgress = false;
  postForm:FormGroup;

  constructor(private fb:FormBuilder,private router: Router) {
    this.inProgress = true;
    this.createSearchForms();
    this.divSearchControl = new FormControl();
    this.filteredDivisions = this.divSearchControl.valueChanges
        .startWith(null)
        .map(name => this.filter(name));
    this.inProgress = false;
  }

  ngOnInit() {
  }

  createSearchForms(){
    this.employeeSearchForm = this.fb.group ({
      employeeSearchControl: ['']
    });
  }

  filter(val: string) {
    return val ? this.divisions.filter(s => s.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.divisions;
  }

  create(){
    this.router.navigate(['/employee/create']);
  }

}
