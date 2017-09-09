import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Organization } from '../../../models/organization';
import { OrganizationService } from '../../../services/organization.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-organization-create',
  templateUrl: './organization-create.component.html',
  styleUrls: ['./organization-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OrganizationCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  orgForm:FormGroup;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private os:OrganizationService) {
      this.inProgress = true;
      this.createForm();
      this.inProgress = false;
    }

  ngOnInit() {
  }

  createForm(){
    this.orgForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''] 
    });
  }

  onSubmit(){
    if(this.orgForm.valid){
      this.os.create(new Organization(
        this.orgForm.value.name,
        this.orgForm.value.nameEng
      )).subscribe(
        (data) => {
          this.orgForm.reset();
          this.router.navigate(['/organization/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.orgForm.reset();
    this.router.navigate(['/organization']);
  }

}
