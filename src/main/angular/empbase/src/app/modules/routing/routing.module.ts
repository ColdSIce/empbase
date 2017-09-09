import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { EmployeeComponent } from '../../components/employee/employee.component';
import { EmployeeEditComponent } from '../../components/employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from '../../components/employee-create/employee-create.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch:'full' },
  { path: 'employee',  component: EmployeeListComponent },
  { path: 'employee/view/:key', component: EmployeeComponent },
  { path: 'employee/edit/:key', component: EmployeeEditComponent },
  { path: 'employee/create', component: EmployeeCreateComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
