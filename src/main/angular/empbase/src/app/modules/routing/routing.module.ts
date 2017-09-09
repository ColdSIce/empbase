import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { EmployeeComponent } from '../../components/employee/employee.component';
import { EmployeeEditComponent } from '../../components/employee-edit/employee-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch:'full' },
  { path: 'employee',  component: EmployeeListComponent },
  { path: 'employee/:key', component: EmployeeComponent },
  { path: 'employee/:key/edit', component: EmployeeEditComponent }
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
