import { Component, OnInit, HostBinding } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class EmployeeCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  employeeForm:FormGroup;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private es:EmployeeService) {
      this.inProgress = true;
      this.createForm();
      this.inProgress = false;
    }

  ngOnInit() {
  }

  createForm(){
    this.employeeForm = this.fb.group ({
      title: ['', Validators.required ],
      text: ['', Validators.required ] 
    });
  }

  onSubmit(){
    if(this.employeeForm.valid){
      /*this.es.create(new Employee(
        this.employeeForm.value.title,
        this.employeeForm.value.text
      )).subscribe(
        (data) => {
          this.postForm.reset();
          this.router.navigate(['/post/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );*/
      this.ts.pop('success', 'Saved!');
    }
  }

  cancel(){
    this.employeeForm.reset();
    this.router.navigate(['/employee']);
  }

}
