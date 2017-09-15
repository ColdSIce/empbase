import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-division-edit',
  templateUrl: './division-edit.component.html',
  styleUrls: ['./division-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class DivisionEditComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  divisionForm:FormGroup;
  division:Division;
  employees:Employee[];
  divisions:Division[];

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
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

        this.route.params.subscribe((params: Params) => {
          this.mode = "Query";
            this.ds.getDivision(params['key']).subscribe(resp => {
              this.division = resp.json() as Division;
              let selectedEmployee:Employee = null;
              this.employees.forEach(e => {
                if(e.onesId == this.division.head.onesId) selectedEmployee = e;
              });
              let selectedRoot:Division = null;
              this.divisions.forEach(d => {
                if(d.id == this.division.rootDivisionId) selectedRoot = d;
              });
              this.divisionForm.setValue({
                name: this.division.name,
                nameEng: this.division.nameEng,
                email: this.division.email,
                head: selectedEmployee,
                root: selectedRoot.id
              });
              this.mode = "Indeterminate";
              this.inProgress = false;
            },
              (error) => {
                this.ts.pop('error', 'Ошибка', error);
                this.inProgress = false;
                this.mode = "Indeterminate";
              }
            ) 
          });
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
      this.division.name = this.divisionForm.value.name;
      this.division.nameEng = this.divisionForm.value.nameEng;
      this.division.email = this.divisionForm.value.shortName;
      this.division.head = this.divisionForm.value.head;
      this.division.rootDivisionId = this.divisionForm.value.root;
      this.ds.update(this.division).subscribe(
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
