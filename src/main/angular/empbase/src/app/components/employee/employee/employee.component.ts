import { Component, OnInit, Input } from '@angular/core';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @Input('employee') employee:Employee;

  constructor() { }

  ngOnInit() {
  }

}
