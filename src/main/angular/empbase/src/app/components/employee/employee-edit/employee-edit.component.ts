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
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class EmployeeEditComponent implements OnInit {

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
    this.ds.getAllDivisions().subscribe(
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

                    this.route.params.subscribe((params: Params) => {
                      
                        this.es.getEmployee(params['key']).subscribe(resp => {
                          this.employee = resp.json() as Employee;

                          let selectedDiv:Division = null;
                          this.divisions.forEach(d => {
                            if(d.id == this.employee.divisionId) selectedDiv = d;
                          });

                          let selectedOrg:Organization = null;
                          this.organizations.forEach(o => {
                            if(o.id == this.employee.organization.id) selectedOrg = o;
                          });

                          let selectedPos:Position = null;
                          this.positions.forEach(p => {
                            if(p.id == this.employee.position.id) selectedPos = p;
                          });

                          let selectedLoca:Location = null;
                          this.locations.forEach(l => {
                            if(l.id == this.employee.location.id) selectedLoca = l;
                          });

                          console.log(new Date(this.employee.birthDate));
                          this.employeeForm.setValue({
                            fio: this.employee.fio,
                            fioEng: this.employee.fioEng,
                            active: this.employee.active,
                            gender: this.employee.gender,
                            uname: this.employee.uname,
                            onesId: this.employee.onesId,
                            dob: new Date(this.employee.birthDate),
                            organization:selectedOrg,
                            div:selectedDiv.id,
                            position:selectedPos,
                            location:selectedLoca
                          });
                          this.inProgress = false;
                        },
                          (error) => {
                            this.ts.pop('error', 'Ошибка', error);
                            this.inProgress = false;
                          }
                        ) 
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
      this.employee.fio = this.employeeForm.value.fio;
      this.employee.fioEng = this.employeeForm.value.fioEng;
      this.employee.active = this.employeeForm.value.active;
      this.employee.gender = this.employeeForm.value.gender;
      this.employee.uname = this.employeeForm.value.uname;
      this.employee.onesId = this.employeeForm.value.onesId;
      this.employee.birthDate = this.employeeForm.value.dob;
      this.employee.organization = this.employeeForm.value.organization;
      this.employee.divisionId = this.employeeForm.value.div;
      this.employee.position = this.employeeForm.value.position;
      this.employee.location = this.employeeForm.value.location;
      this.employee.updated = new Date();

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

  upload(){
    let input:HTMLInputElement = <HTMLInputElement>document.getElementById("upload");
    if(input.files[0]){
      let fileType = input.files[0]['type'];
      let fileSize = input.files[0].size / 1024;//Kb
      if(this.validFileTypes.includes(fileType)){
        if(fileSize < 500){
          if(this.employee.id) {
            let formData = new FormData();
            formData.append('file', input.files[0]);
            this.is.update(formData, this.employee.id).subscribe(
              (data) => {
                this.loadData();
              },
              (error) => {
                this.ts.pop('error', 'Ошибка', error);
              }
            );
          }
        }else{
          this.ts.pop('warning', 'Предупреждение', "Превышен максимальный допустимый размер фотографии(500Kb).");
        }
      }else{
        this.ts.pop('warning', 'Предупреждение', "Выможете загружать только фотографии(.jpg, .jpeg, .png, .gif).");
      }
    }
    input.value = null;
  }

}
