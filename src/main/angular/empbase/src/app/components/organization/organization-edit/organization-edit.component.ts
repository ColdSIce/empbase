import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Organization } from '../../../models/organization';
import { OrganizationService } from '../../../services/organization.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OrganizationEditComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = true;
  orgForm:FormGroup;
  organization:Organization;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private os:OrganizationService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.os.getOrganization(params['key']).subscribe(resp => {
          this.organization = resp.json() as Organization;
          this.orgForm.setValue({
            name:this.organization.name,
            nameEng:this.organization.nameEng
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
  }

  createForm(){
    this.orgForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''] 
    });
  }

  onSubmit(){
    if(this.orgForm.valid){
      this.organization.name = this.orgForm.value.name;
      this.organization.nameEng = this.orgForm.value.nameEng;
      this.os.update(this.organization).subscribe(
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
