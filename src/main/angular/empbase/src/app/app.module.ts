import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdButtonModule, 
  MdCheckboxModule, 
  MdGridListModule, 
  MdToolbarModule,
  MdListModule,
  MdAutocompleteModule,
  MdInputModule,
  MdProgressBarModule,
  MdCardModule,
  MdSelectionList,
  MdListOption,
  MdMenuModule,
  MdIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RoutingModule } from './modules/routing/routing.module';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {ToasterModule, ToasterService} from 'angular2-toaster';
import { HttpModule }    from '@angular/http';

import { ApplicationService } from './services/application.service';
import { ContactService } from './services/contact.service';
import { DeputyService } from './services/deputy.service';
import { DivisionService } from './services/division.service';
import { EmployeeService } from './services/employee.service';
import { ImageService } from './services/image.service';
import { LocationService } from './services/location.service';
import { OfficeService } from './services/office.service';
import { OrganizationService } from './services/organization.service';
import { PositionService } from './services/position.service';
import { SkillService } from './services/skill.service';

import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { EmployeeComponent } from './components/employee/employee/employee.component';
import { EmployeeEditComponent } from './components/employee/employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { ContactTypeComponent } from './components/contact/contact-type/contact-type.component';
import { ContactTypeListComponent } from './components/contact/contact-type-list/contact-type-list.component';
import { ContactTypeCreateComponent } from './components/contact/contact-type-create/contact-type-create.component';
import { ContactTypeEditComponent } from './components/contact/contact-type-edit/contact-type-edit.component';
import { DivisionComponent } from './components/division/division/division.component';
import { DivisionListComponent } from './components/division/division-list/division-list.component';
import { DivisionCreateComponent } from './components/division/division-create/division-create.component';
import { DivisionEditComponent } from './components/division/division-edit/division-edit.component';
import { ImageTypeComponent } from './components/image/image-type/image-type.component';
import { ImageTypeListComponent } from './components/image/image-type-list/image-type-list.component';
import { ImageTypeEditComponent } from './components/image/image-type-edit/image-type-edit.component';
import { ImageTypeCreateComponent } from './components/image/image-type-create/image-type-create.component';
import { OfficeComponent } from './components/officeAndLocation/office/office.component';
import { LocationComponent } from './components/officeAndLocation/location/location.component';
import { OfficeAndLocationListComponent } from './components/officeAndLocation/office-and-location-list/office-and-location-list.component';
import { LocationCreateComponent } from './components/officeAndLocation/location-create/location-create.component';
import { OfficeCreateComponent } from './components/officeAndLocation/office-create/office-create.component';
import { LocationEditComponent } from './components/officeAndLocation/location-edit/location-edit.component';
import { OfficeEditComponent } from './components/officeAndLocation/office-edit/office-edit.component';
import { OrganizationComponent } from './components/organization/organization/organization.component';
import { OrganizationListComponent } from './components/organization/organization-list/organization-list.component';
import { OrganizationEditComponent } from './components/organization/organization-edit/organization-edit.component';
import { OrganizationCreateComponent } from './components/organization/organization-create/organization-create.component';
import { PositionComponent } from './components/position/position/position.component';
import { PositionListComponent } from './components/position/position-list/position-list.component';
import { PositionEditComponent } from './components/position/position-edit/position-edit.component';
import { PositionCreateComponent } from './components/position/position-create/position-create.component';
import { SkillComponent } from './components/skill/skill/skill.component';
import { SkillCreateComponent } from './components/skill/skill-create/skill-create.component';
import { SkillEditComponent } from './components/skill/skill-edit/skill-edit.component';
import { SkillTypeComponent } from './components/skill/skill-type/skill-type.component';
import { SkillTypeCreateComponent } from './components/skill/skill-type-create/skill-type-create.component';
import { SkillTypeEditComponent } from './components/skill/skill-type-edit/skill-type-edit.component';
import { SkillsComponent } from './components/skill/skills/skills.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeComponent,
    EmployeeEditComponent,
    EmployeeCreateComponent,
    ContactTypeComponent,
    ContactTypeListComponent,
    ContactTypeCreateComponent,
    ContactTypeEditComponent,
    DivisionComponent,
    DivisionListComponent,
    DivisionCreateComponent,
    DivisionEditComponent,
    ImageTypeComponent,
    ImageTypeListComponent,
    ImageTypeEditComponent,
    ImageTypeCreateComponent,
    OfficeComponent,
    LocationComponent,
    OfficeAndLocationListComponent,
    LocationCreateComponent,
    OfficeCreateComponent,
    LocationEditComponent,
    OfficeEditComponent,
    OrganizationComponent,
    OrganizationListComponent,
    OrganizationEditComponent,
    OrganizationCreateComponent,
    PositionComponent,
    PositionListComponent,
    PositionEditComponent,
    PositionCreateComponent,
    SkillComponent,
    SkillCreateComponent,
    SkillEditComponent,
    SkillTypeComponent,
    SkillTypeCreateComponent,
    SkillTypeEditComponent,
    SkillsComponent
  ],
  imports: [
    BrowserModule,
    MdButtonModule, 
    MdToolbarModule,
    MdProgressBarModule,
    BrowserAnimationsModule,
    MdButtonModule, 
    MdCheckboxModule,
    MdGridListModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    MdAutocompleteModule,
    ReactiveFormsModule,
    MdCardModule,
    MdInputModule,
    MdMenuModule,
    MdProgressBarModule,
    HttpModule,
    ToasterModule,
    RoutingModule
  ],
  providers: [
    ApplicationService,
    ContactService,
    DeputyService,
    DivisionService,
    EmployeeService,
    ImageService,
    LocationService,
    OfficeService,
    OrganizationService,
    PositionService,
    SkillService
  ],
  exports: [
    MdButtonModule, 
    MdCheckboxModule,
    MdGridListModule,
    MdCardModule,
    MdToolbarModule,
    MdAutocompleteModule,
    MdInputModule,
    MdMenuModule,
    MdProgressBarModule,
    MdListModule,
    MdIconModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
