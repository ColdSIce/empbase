import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../../components/employee/employee.component';
import { EmployeeEditComponent } from '../../components/employee-edit/employee-edit.component';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
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

  constructor(private fb:FormBuilder) {
    this.createSearchForms();
    this.divSearchControl = new FormControl();
    this.filteredDivisions = this.divSearchControl.valueChanges
        .startWith(null)
        .map(name => this.filter(name));
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

}
