import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';
import { Employee } from '../../models/employee';
import { Role } from '../../models/role';
import { Permission } from '../../models/permission';
import { RoleService } from '../../services/role.service';
import { PermissionService } from '../../services/permission.service';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class AdminComponent implements OnInit {

  roles:Role[];
  selectedRole:Role;
  permissions:Permission[];
  employees:Employee[];
  inProgress = true;

  constructor(
    private router: Router,
    private es:EmployeeService, 
    private rs:RoleService, 
    private ps:PermissionService, 
    private ts:ToasterService) {
      this.inProgress = true;
  }

  ngOnInit() {
    this.es.getActive().subscribe((data) => {
      this.employees = data.json() as Employee[];

      this.ps.getAll().subscribe((data) => { 
        this.permissions = data.json() as Permission[];

        this.rs.getAll().subscribe((data) => { 
          this.roles = data.json() as Role[];
          this.inProgress = false;
          },(error) => {
            this.ts.pop('error', 'Ошибка', error);
            this.inProgress = false;
          });

      },(error) => {
        this.ts.pop('error', 'Ошибка', error);
        this.inProgress = false;
      });

    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.inProgress = false;
    });
  }

  selectRole(role:Role){
    if(role === this.selectedRole && this.selectedRole !== undefined){
      if(this.selectedRole) this.selectedRole.selected = false;
      this.selectedRole = null;
    }else{
      if(this.selectedRole) this.selectedRole.selected = false;
      this.selectedRole = role;
      this.selectedRole.selected = true;
    }
  }

}
