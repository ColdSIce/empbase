import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-division-create',
  templateUrl: './division-create.component.html',
  styleUrls: ['./division-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class DivisionCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  divisionForm:FormGroup;
  employees:Employee[];
  divisions:Division[];

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private ds:DivisionService,
    private es:EmployeeService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.es.getAll().subscribe((data) => {
      this.mode = "Query";
      this.employees = data.json() as Employee[];

      this.ds.getAllDivisions().subscribe((data) => {
        this.mode = "Query";
        this.divisions = data.json() as Division[];
        this.mode = "Indeterminate";
        this.inProgress = false;
      },(error) => {
        this.ts.pop('error', 'Ошибка', error);
        this.mode = "Indeterminate";
        this.inProgress = false;
      });

    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.mode = "Indeterminate";
      this.inProgress = false;
    });
  }

  createForm(){
    this.divisionForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''],
      email: ['', Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")],
      root:['', Validators.required ],
      head:['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.divisionForm.valid){
      let division:Division = new Division(
        this.divisionForm.value.name,
        this.divisionForm.value.nameEng,
        '',
        this.divisionForm.value.email,
        this.divisionForm.value.root,
        this.divisionForm.value.head
      );
      this.ds.create(division).subscribe(
        (data) => {
          this.divisionForm.reset();
          this.router.navigate(['/division/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.divisionForm.reset();
    this.router.navigate(['/division']);
  }

}
