import { Component, OnInit, HostBinding, Inject } from '@angular/core';
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
import { Contact } from '../../../models/contact';
import { ContactType } from '../../../models/contactType';
import { ContactService } from '../../../services/contact.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { DateAdapter, NativeDateAdapter } from '@angular/material';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

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
  cts:ContactType[];
  validFileTypes = ["image/gif", "image/jpeg", "image/png"];
  selectedCT:ContactType;

  constructor(
    private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private ds:DivisionService,
    public contactDialog: MdDialog,
    private es:EmployeeService,
    private ls:LocationService,
    private ps:PositionService,
    private is:ImageService,
    private os:OrganizationService,
    private cs:ContactService,
    dateAdapter: DateAdapter<NativeDateAdapter>) {
      this.createForm();
      dateAdapter.setLocale('ru-RU');
    }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.inProgress = true;
    this.cs.getAllContactTypes().subscribe((data) => {
      this.cts = data.json() as ContactType[];
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
    });

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

  openContactDialog(){
    const dialogRef = this.contactDialog.open(ContactDialog, {
      height: '220px',
      width: '400px',
      data: {
        cts: this.cts
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result.ct || !result.value) {
        this.ts.pop('error', 'Ошибка', "Введены некорректные данные");
        return;
      }
      let ct = this.getContactTypeById(result.ct);
      if(!ct){
        this.ts.pop('error', 'Ошибка', "Не удалось определить тип контакта");
        return;
      }
      let contact = new Contact(result.value, ct, this.employee);
      this.cs.create(contact, this.employee.id).subscribe(
        (data) => {
          this.loadData();
          this.ts.pop('success', 'Успех', "Контакт добавлен");
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    });
  }

  editContact(cont:Contact){
   const dialogRef = this.contactDialog.open(ContactDialog, {
      height: '220px',
      width: '400px',
      data: {
        cts: this.cts,
        model:{
          id: cont.id,
          ct: cont.contactType.id,
          value: cont.value
        }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result.id || !result.ct || !result.value) {
        this.ts.pop('error', 'Ошибка', "Введены некорректные данные");
        return;
      }
      let ct = this.getContactTypeById(result.ct);
      if(!ct){
        this.ts.pop('error', 'Ошибка', "Не удалось определить тип контакта");
        return;
      }
      let contact = new Contact(result.value, ct, this.employee);
      contact.id = result.id;
      this.cs.update(contact).subscribe(
        (data) => {
          this.loadData();
          this.ts.pop('success', 'Успех', "Контакт добавлен");
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    });
  }

  deleteContact(cont:Contact){
    if(cont.id){
      this.cs.delete(cont.id).subscribe(
        (data) => {
          this.loadData();
          this.ts.pop('success', 'Успех', "Контакт удален");
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  getContactTypeById(id:number){
    let filtered = this.cts.filter(ct => ct.id == id);
    return filtered.length == 1 ? filtered[0] : null;
  }

}

 


@Component({
  selector: 'contact-dialog',
  templateUrl: 'contact-dialog.html',
})
export class ContactDialog {
  constructor(
    public dialogRef: MdDialogRef<ContactDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    if(data.model){
      this.model.id = data.model.id;
      this.model.ct = data.model.ct;
      this.model.value = data.model.value;
    }
  }

  model = {
    id:null,
    ct:null,
    value:null
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.model);
  }

}