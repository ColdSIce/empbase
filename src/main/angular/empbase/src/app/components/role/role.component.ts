import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class RoleComponent implements OnInit {

  inProgress = true;
  roleForm:FormGroup;
  role:Role;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private rs:RoleService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.rs.getRole(params['key']).subscribe(resp => {
        this.role = resp.json() as Role;
        this.roleForm.setValue({
          name:this.role.name,
        });
        this.inProgress = false;
      },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
          this.inProgress = false;
        }
      ) 
    });
  }

  createForm(){
    this.roleForm = this.fb.group ({
      name: ['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.roleForm.valid){
      this.role.name = this.roleForm.value.name;
      this.rs.update(this.role).subscribe(
        (data) => {
          this.roleForm.reset();
          this.router.navigate(['/admin']);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.roleForm.reset();
    this.router.navigate(['/admin']);
  }

  delete(){
    this.rs.delete(this.role.id).subscribe(
      (resp) => {
        this.router.navigate(['/admin']);
      },
      (err) => {
        this.ts.pop('error', 'Ошибка', err);
      }
    );
  }

}
