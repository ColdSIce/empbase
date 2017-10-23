import { Component, OnInit, HostBinding, Inject } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../router.animation';
import { Employee } from '../../models/employee';
import { Application } from '../../models/application';
import { ApplicationService } from '../../services/application.service';
import { Role } from '../../models/role';
import { Permission } from '../../models/permission';
import { RoleService } from '../../services/role.service';
import { PermissionService } from '../../services/permission.service';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { MdDialog, MdDialogRef, MD_DIALOG_DATA } from '@angular/material';

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
  applications:Application[];
  inProgress = true;

  constructor(
    private router: Router,
    private es:EmployeeService, 
    private rs:RoleService, 
    private as:ApplicationService, 
    public roleDialog: MdDialog,
    public permissionDialog: MdDialog,
    public addPermissionDialog: MdDialog,
    public employeeDialog: MdDialog,
    private ps:PermissionService, 
    private ts:ToasterService) {
      this.inProgress = true;
  }

  ngOnInit() {
    this.loadData();
  }

  loadData(){
    this.inProgress = true;
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

      this.as.getAll().subscribe((data) => { 
        this.applications = data.json() as Application[];
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

  goToPermission(id:number){
    this.router.navigate(['/permission/' + id]);
  }

  goToRole(id:number){
    this.router.navigate(['/role/' + id]);
  }

  deletePermission(id:number){
    if(!id) return;
    let index = -1;
    this.selectedRole.permissions.forEach(p => {
      if(p.id == id) index = this.selectedRole.permissions.indexOf(p);
    });
    if(index > -1 ){
       this.selectedRole.permissions.splice(index, 1);
       this.rs.update(this.selectedRole).subscribe((data) => { 
          this.ts.pop('success', 'Успех', 'Удалено');
        },(error) => {
          this.ts.pop('error', 'Ошибка', error);
          this.inProgress = false;
        });
    }
  }

  deleteEmployee(id:number){
    if(!id) return;
    let index = -1;
    this.selectedRole.employees.forEach(e => {
      if(e.id == id) index = this.selectedRole.employees.indexOf(e);
    });
    if(index > -1 ){
       this.selectedRole.employees.splice(index, 1);
       this.rs.update(this.selectedRole).subscribe((data) => { 
          this.ts.pop('success', 'Успех', 'Удалено');
        },(error) => {
          this.ts.pop('error', 'Ошибка', error);
          this.inProgress = false;
        });
    }
  }

  createRole(){
    const dialogRef = this.roleDialog.open(RoleDialog, {
      height: '180px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result.name) {
        this.ts.pop('error', 'Ошибка', "Введены некорректные данные");
        return;
      }
      let role = new Role(result.name);
      this.rs.create(role).subscribe(
        (data) => {
          this.loadData();
          this.ts.pop('success', 'Успех', "Роль добавлен");
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    });
  }

  createPermission(){
    const dialogRef = this.permissionDialog.open(PermissionDialog, {
      height: '280px',
      width: '400px',
      data: {
        apps: this.applications
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result.name || !result.app) {
        this.ts.pop('error', 'Ошибка', "Введены некорректные данные");
        return;
      }
      let permission = new Permission(result.name, result.app);
      this.ps.create(permission).subscribe(
        (data) => {
          this.loadData();
          this.ts.pop('success', 'Успех', "Пермишн добавлен");
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    });
  }

  addEmployee(){
    const dialogRef = this.employeeDialog.open(EmployeeDialog, {
      height: '180px',
      width: '400px',
      data: {
        employees: this.employees
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if(!this.selectedRole) {
        this.ts.pop('warning', 'Ошибка', "Сначала выберите роль");
        return;
      }
      if(!result.employee) {
        this.ts.pop('error', 'Ошибка', "Введены некорректные данные");
        return;
      }
      let exists = false;
      this.selectedRole.employees.forEach(e => {
        if(e.id == result.employee.id) exists = true;
      });
      if(!exists){
        this.selectedRole.employees.push(result.employee);
        this.rs.update(this.selectedRole).subscribe(
        (data) => {
          this.loadData();
          this.ts.pop('success', 'Успех', "Сотрудник добавлен в роль");
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
      }else{
        this.ts.pop('warning', 'Ошибка', "Выбранный сотрудник уже существует");
      } 
      
    });
  }


  addPermission(){
    const dialogRef = this.addPermissionDialog.open(AddPermissionDialog, {
      height: '180px',
      width: '400px',
      data: {
        permissions: this.permissions
      }

    });

    dialogRef.afterClosed().subscribe(result => {
      if(!this.selectedRole) {
        this.ts.pop('warning', 'Ошибка', "Сначала выберите роль");
        return;
      }
      if(!result.permission) {
        this.ts.pop('error', 'Ошибка', "Введены некорректные данные");
        return;
      }
      let exists = false;
      this.selectedRole.permissions.forEach(p => {
        if(p.id == result.permission.id) exists = true;
      });
      if(!exists){
        this.selectedRole.permissions.push(result.permission);
        this.rs.update(this.selectedRole).subscribe(
        (data) => {
          this.loadData();
          this.ts.pop('success', 'Успех', "Пермишн добавлен в роль");
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
      }else{
        this.ts.pop('warning', 'Ошибка', "Выбранный пермишн уже существует");
      }    
    });
  }

}


@Component({
  selector: 'role-dialog',
  templateUrl: 'role-dialog.html',
})
export class RoleDialog {
  constructor(
    public dialogRef: MdDialogRef<RoleDialog>
  ) {}

  model = {
    name:null
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.model);
  }
}


@Component({
  selector: 'permission-dialog',
  templateUrl: 'permission-dialog.html',
})
export class PermissionDialog {
  constructor(
    public dialogRef: MdDialogRef<PermissionDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}

  model = {
    name:null,
    app: null
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.model);
  }
}


@Component({
  selector: 'add-permission-dialog',
  templateUrl: 'add-permission-dialog.html',
})
export class AddPermissionDialog {
  constructor(
    public dialogRef: MdDialogRef<AddPermissionDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}

  model = {
    permission:null
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.model);
  }
}


@Component({
  selector: 'employee-dialog',
  templateUrl: 'employee-dialog.html',
})
export class EmployeeDialog {
  constructor(
    public dialogRef: MdDialogRef<EmployeeDialog>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {}

  model = {
    employee:null
  }

  close(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.model);
  }
}