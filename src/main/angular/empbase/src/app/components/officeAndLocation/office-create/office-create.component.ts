import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Office } from '../../../models/office';
import { OfficeService } from '../../../services/office.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-office-create',
  templateUrl: './office-create.component.html',
  styleUrls: ['./office-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OfficeCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  officeForm:FormGroup;
  employees:Employee[];

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private os:OfficeService,
    private es:EmployeeService) {
      this.inProgress = true;
      this.createForm();
      this.inProgress = false;
    }

  ngOnInit() {
    this.es.getAll().subscribe((data) => {
      this.mode = "Query";
      this.employees = data.json() as Employee[];
      this.mode = "Indeterminate";
      this.inProgress = false;
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.mode = "Indeterminate";
      this.inProgress = false;
    });
  }

  createForm(){
    this.officeForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''],
      shortName: [''],
      head:['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.officeForm.valid){
      let office:Office = new Office(
        this.officeForm.value.name,
        this.officeForm.value.nameEng,
        this.officeForm.value.shortName,
        this.officeForm.value.head
      );
      this.os.create(office).subscribe(
        (data) => {
          this.officeForm.reset();
          this.router.navigate(['/office/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.officeForm.reset();
    this.router.navigate(['/officeAndLocation']);
  }

}
