import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from '../../components/employee/employee-list/employee-list.component';
import { EmployeeComponent } from '../../components/employee/employee/employee.component';
import { EmployeeEditComponent } from '../../components/employee/employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from '../../components/employee/employee-create/employee-create.component';

import { ContactTypeComponent } from '../../components/contact/contact-type/contact-type.component';
import { ContactTypeListComponent } from '../../components/contact/contact-type-list/contact-type-list.component';
import { ContactTypeCreateComponent } from '../../components/contact/contact-type-create/contact-type-create.component';
import { ContactTypeEditComponent } from '../../components/contact/contact-type-edit/contact-type-edit.component';
import { DivisionComponent } from '../../components/division/division/division.component';
import { DivisionListComponent } from '../../components/division/division-list/division-list.component';
import { DivisionCreateComponent } from '../../components/division/division-create/division-create.component';
import { DivisionEditComponent } from '../../components/division/division-edit/division-edit.component';
import { ImageTypeComponent } from '../../components/image/image-type/image-type.component';
import { ImageTypeListComponent } from '../../components/image/image-type-list/image-type-list.component';
import { ImageTypeEditComponent } from '../../components/image/image-type-edit/image-type-edit.component';
import { ImageTypeCreateComponent } from '../../components/image/image-type-create/image-type-create.component';
import { OfficeComponent } from '../../components/officeAndLocation/office/office.component';
import { LocationComponent } from '../../components/officeAndLocation/location/location.component';
import { OfficeAndLocationListComponent } from '../../components/officeAndLocation/office-and-location-list/office-and-location-list.component';
import { LocationCreateComponent } from '../../components/officeAndLocation/location-create/location-create.component';
import { OfficeCreateComponent } from '../../components/officeAndLocation/office-create/office-create.component';
import { LocationEditComponent } from '../../components/officeAndLocation/location-edit/location-edit.component';
import { OfficeEditComponent } from '../../components/officeAndLocation/office-edit/office-edit.component';
import { OrganizationComponent } from '../../components/organization/organization/organization.component';
import { OrganizationListComponent } from '../../components/organization/organization-list/organization-list.component';
import { OrganizationEditComponent } from '../../components/organization/organization-edit/organization-edit.component';
import { OrganizationCreateComponent } from '../../components/organization/organization-create/organization-create.component';
import { PositionComponent } from '../../components/position/position/position.component';
import { PositionListComponent } from '../../components/position/position-list/position-list.component';
import { PositionEditComponent } from '../../components/position/position-edit/position-edit.component';
import { PositionCreateComponent } from '../../components/position/position-create/position-create.component';
import { SkillComponent } from '../../components/skill/skill/skill.component';
import { SkillCreateComponent } from '../../components/skill/skill-create/skill-create.component';
import { SkillEditComponent } from '../../components/skill/skill-edit/skill-edit.component';
import { SkillTypeComponent } from '../../components/skill/skill-type/skill-type.component';
import { SkillTypeCreateComponent } from '../../components/skill/skill-type-create/skill-type-create.component';
import { SkillTypeEditComponent } from '../../components/skill/skill-type-edit/skill-type-edit.component';
import { SkillsComponent } from '../../components/skill/skills/skills.component';

const routes: Routes = [
  { path: '', redirectTo: '/employee', pathMatch:'full' },
  { path: 'employee',  component: EmployeeListComponent },
  { path: 'employee/view/:key', component: EmployeeComponent },
  { path: 'employee/edit/:key', component: EmployeeEditComponent },
  { path: 'employee/create', component: EmployeeCreateComponent },
  { path: 'division',  component: DivisionListComponent },
  { path: 'division/view/:key', component: DivisionComponent },
  { path: 'division/edit/:key', component: DivisionEditComponent },
  { path: 'division/create', component: DivisionCreateComponent },
  { path: 'contactType',  component: ContactTypeListComponent },
  { path: 'contactType/view/:key', component: ContactTypeComponent },
  { path: 'contactType/edit/:key', component: ContactTypeEditComponent },
  { path: 'contactType/create', component: ContactTypeCreateComponent },
  { path: 'imageType',  component: ImageTypeListComponent },
  { path: 'imageType/view/:key', component: ImageTypeComponent },
  { path: 'imageType/edit/:key', component: ImageTypeEditComponent },
  { path: 'imageType/create', component: ImageTypeCreateComponent },
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
