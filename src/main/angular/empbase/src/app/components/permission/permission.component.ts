import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';
import { Permission } from '../../models/permission';
import { PermissionService } from '../../services/permission.service';
import { Application } from '../../models/application';
import { ApplicationService } from '../../services/application.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class PermissionComponent implements OnInit {

  inProgress = true;
  pForm:FormGroup;
  permission:Permission;
  applications:Application[] = [];

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private as:ApplicationService,
    private ps:PermissionService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.ps.getPermission(params['key']).subscribe(resp => {
        this.permission = resp.json() as Permission;

        this.as.getAll().subscribe(apps => {
          this.applications = apps.json() as Application[];

          let selectedApp = null;
          if(this.permission.application) this.applications.forEach(a => {
            if(a.id == this.permission.application.id) selectedApp = a;
          });

          this.pForm.setValue({
            name:this.permission.name,
            app:selectedApp
          });

          this.inProgress = false;
        }, err => {
          this.ts.pop('error', 'Ошибка', err);
          this.inProgress = false;
        });
      },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
          this.inProgress = false;
        }
      ) 
    });
  }

  createForm(){
    this.pForm = this.fb.group ({
      name: ['', Validators.required ],
      app: ['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.pForm.valid){
      this.permission.name = this.pForm.value.name;
      this.permission.application = this.pForm.value.app;
      this.ps.update(this.permission).subscribe(
        (data) => {
          this.pForm.reset();
          this.router.navigate(['/admin']);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.pForm.reset();
    this.router.navigate(['/admin']);
  }

  delete(){
    this.ps.delete(this.permission.id).subscribe(
      (resp) => {
        this.router.navigate(['/admin']);
      },
      (err) => {
        this.ts.pop('error', 'Ошибка', err);
      }
    );
  }

}
