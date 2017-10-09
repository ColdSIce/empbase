import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { Organization } from '../../../models/organization';
import { OrganizationService } from '../../../services/organization.service';
import { Position } from '../../../models/position';
import { PositionService } from '../../../services/position.service';
import { Location } from '../../../models/location';
import { Office } from '../../../models/office';
import { Image } from '../../../models/image';
import { LocationService } from '../../../services/location.service';
import { OfficeService } from '../../../services/office.service';
import { ImageService } from '../../../services/image.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { DateAdapter, NativeDateAdapter } from '@angular/material';


@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class EmployeeCreateComponent implements OnInit {

  genders = [
    {
      name:'муж',
      value:'male'
    },
    {
      name:'жен',
      value:'female'
    }
  ];
  inProgress = true;
  employeeForm:FormGroup;
  employee:Employee;
  divisions:Division[];
  organizations:Organization[];
  positions:Position[];
  locations:Location[];
  validFileTypes = ["image/gif", "image/jpeg", "image/png"];

  constructor(
    private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private ds:DivisionService,
    private es:EmployeeService,
    private ls:LocationService,
    private ps:PositionService,
    private is:ImageService,
    private os:OrganizationService,
    dateAdapter: DateAdapter<NativeDateAdapter>) {
      this.createForm();
      dateAdapter.setLocale('ru-RU');
    }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.ds.getFlatByRoot().subscribe(
      (data) => {
        this.divisions = data.json() as Division[];

        this.ps.getAll().subscribe(
          (data) => {
            this.positions = data.json() as Position[];

            this.ls.getAll().subscribe(
              (data) => {
                this.locations = data.json() as Location[];

                this.os.getAll().subscribe(
                  (data) => {
                    this.organizations = data.json() as Organization[];  
                    this.inProgress = false;
                  },
                  (error) => {
                    this.ts.pop('error', 'Ошибка', error);
                    this.inProgress = false;
                  });

              },
              (error) => {
                this.ts.pop('error', 'Ошибка', error);
                this.inProgress = false;
              });

          },
          (error) => {
            this.ts.pop('error', 'Ошибка', error);
            this.inProgress = false;
          });

      },
      (error) => {
        this.ts.pop('error', 'Ошибка', error);
        this.inProgress = false;
      });
  }

  createForm(){
    this.employeeForm = this.fb.group ({
      fio: ['', Validators.required ],
      fioEng: [''],
      active:[''],
      gender:['' ],
      uname:['' ],
      onesId:['' ],
      dob:[null],
      organization:['' ],
      div:['' ],
      position:['' ],
      location:['' ]
    });
  }

  onSubmit(){
    if(this.employeeForm.valid){
      this.employee = new Employee(
        this.employeeForm.value.position,
        this.employeeForm.value.div,
        this.employeeForm.value.fio,
        this.employeeForm.value.fioEng,
        this.employeeForm.value.gender,
        this.employeeForm.value.uname,
        this.employeeForm.value.onesId,
        this.employeeForm.value.dob,
        new Date(),
        new Date(),
        this.employeeForm.value.location,
        this.employeeForm.value.organization,
        this.employeeForm.value.active
    );
      this.es.update(this.employee).subscribe(
        (data) => {
          this.employeeForm.reset();
          this.router.navigate(['/employee/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.employeeForm.reset();
    this.router.navigate(['/employee']);
  }

}



