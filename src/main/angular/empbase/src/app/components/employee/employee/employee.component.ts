import { Component, OnInit, Input } from '@angular/core';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { ImageService } from '../../../services/image.service';
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
  patt:RegExp = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");

  constructor(
    private router: Router,
    private is:ImageService) { }

  ngOnInit() {
  }

  itIsEmail(str:string){
    return this.patt.test(str);
  }

  getImage(id:number){
    if(id) return this.is.getImageSource(id);
  }

  toEmployee(id:number){
    if(id) this.router.navigate(['/employee/view/' + id]);
  }
}
