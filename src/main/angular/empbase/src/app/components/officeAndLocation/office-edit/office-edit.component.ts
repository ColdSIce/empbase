import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Office } from '../../../models/office';
import { OfficeService } from '../../../services/office.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-office-edit',
  templateUrl: './office-edit.component.html',
  styleUrls: ['./office-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OfficeEditComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  officeForm:FormGroup;
  office:Office;
  employees:Employee[];

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private os:OfficeService,
    private es:EmployeeService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.es.getAll().subscribe((data) => {
      this.mode = "Query";
      this.employees = data.json() as Employee[];

      this.route.params.subscribe((params: Params) => {
        this.mode = "Query";
          this.os.getOffice(params['key']).subscribe(resp => {
            this.office = resp.json() as Office;
            let selected = null;
            this.employees.forEach(e => {
              if(e.onesId == this.office.head.onesId) selected = e;
            });
            this.officeForm.setValue({
              name: this.office.name,
              nameEng: this.office.nameEng,
              shortName: this.office.shortName,
              head: selected
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
    
  }

  createForm(){
    this.officeForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''],
      shortName: [''],
      head:['' ]
    });
  }

  onSubmit(){
    if(this.officeForm.valid){
      this.office.name = this.officeForm.value.name;
      this.office.nameEng = this.officeForm.value.nameEng;
      this.office.shortName = this.officeForm.value.shortName;
      this.office.head = this.officeForm.value.head;
      this.os.update(this.office).subscribe(
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
