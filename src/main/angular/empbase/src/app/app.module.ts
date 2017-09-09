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
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';

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

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeComponent,
    EmployeeEditComponent
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
