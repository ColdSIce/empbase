import { Component, OnInit } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { EmployeeEditComponent } from '../employee-edit/employee-edit.component';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Division } from '../../../models/division';
import { DivisionService } from '../../../services/division.service';
import { Organization } from '../../../models/organization';
import { OrganizationService } from '../../../services/organization.service';
import { Office } from '../../../models/office';
import { OfficeService } from '../../../services/office.service';
import { Location } from '../../../models/location';
import { LocationService } from '../../../services/location.service';
import { Position } from '../../../models/position';
import { PositionService } from '../../../services/position.service';
import { ImageService } from '../../../services/image.service';
import { Employee } from '../../../models/employee';
import { EmployeeService } from '../../../services/employee.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class EmployeeListComponent implements OnInit {

  divSearchControl:FormControl;
  employeeSearchControl:FormControl;
  OrgFormControl:FormControl;
  PosFormControl:FormControl;
  OfficeFormControl:FormControl;
  locaFormControl:FormControl;
  statusFormControl:FormControl;
  divisions:Division[];
  filteredDivisions: any;
  employees:Employee[];
  filteredEmployees: any;
  organizations:Organization[];
  filteredOrgs:any;
  offices:Office[];
  filteredOffices:any;
  locations:Location[];
  filteredLocations:any;
  positions:Position[];
  filteredPositions:any;
  rendered:Employee[] = [];

  filters={
    employeeId:null,
    divisionId:null,
    organizationId:null,
    positionId:null,
    officeId:null,
    locationId:null,
    active:true
  }

  mode = "Indeterminate";
  inProgress = true;

  constructor(
    private fb:FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ds:DivisionService,
    private es:EmployeeService,
    private os:OrganizationService,
    private ps:PositionService,
    private ofs:OfficeService,
    private ls:LocationService,
    private is:ImageService,
    private ts:ToasterService) {
    this.inProgress = true;
    this.divSearchControl = new FormControl();
    this.employeeSearchControl = new FormControl();
    this.OrgFormControl = new FormControl();
    this.PosFormControl = new FormControl();
    this.OfficeFormControl = new FormControl();
    this.locaFormControl = new FormControl();
    this.statusFormControl = new FormControl();

  }

  ngOnInit() {
    //filters initialization
    this.route.queryParams.subscribe((params: Params) => {
        if(params['division'] || params['active'] || params['employee'] || params['organization'] || params['position'] || params['office'] || params['location']){
          this.filters.divisionId = params['division'];
          //this.filters.active = params['active'] as boolean;
          this.filters.employeeId = params['employee'];
          this.filters.organizationId = params['organization'];
          this.filters.positionId = params['position'];
          this.filters.officeId = params['office'];
          this.filters.locationId = params['location'];
        }else{
          this.filters.divisionId = 85;
          //this.filters.active = true;
        }
      },
      (error) => {
        this.ts.pop('error', 'Ошибка', error);
        this.inProgress = false;
      }
    );

    //form controls initialization
    this.statusFormControl.setValue(this.filters.active);

    this.ds.getFlatByRoot().subscribe((data) => {
      this.divisions = data.json() as Division[];
      this.divSearchControl.setValue(this.divisions.find(d => d.id == this.filters.divisionId));
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
    });

    this.os.getAll().subscribe(
      (data) => {
        this.organizations = data.json() as Organization[];
        this.OrgFormControl.setValue(this.organizations.find(o => o.id == this.filters.organizationId));
      },
      (error) => {
        this.ts.pop('error', 'Ошибка', error);
      }
    );

    this.ofs.getAll().subscribe(
      (data) => {
        this.offices = data.json() as Office[];
        this.OfficeFormControl.setValue(this.offices.find(o => o.id == this.filters.officeId));
      },
      (error) => {
        this.ts.pop('error', 'Ошибка', error);
      }
    );

    this.ls.getAll().subscribe(
      (data) => {
        this.locations = data.json() as Location[];
        this.locaFormControl.setValue(this.locations.find(o => o.id == this.filters.locationId));
      },
      (error) => {
        this.ts.pop('error', 'Ошибка', error);
      }
    );

    this.ps.getAll().subscribe(
      (data) => {
        this.positions = data.json() as Position[];
        this.PosFormControl.setValue(this.positions.find(o => o.id == this.filters.positionId));
      },
      (error) => {
        this.ts.pop('error', 'Ошибка', error);
      }
    );

    this.loadEmployees();
  }

  loadEmployees(){
    this.inProgress = true;
    this.rendered = [];
    this.ds.getAllEmployeesByDivision(
        this.filters.divisionId, 
        this.filters.active, 
        this.filters.employeeId == null ? null : this.filters.employeeId, 
        this.filters.organizationId == null ? null : this.filters.organizationId, 
        this.filters.locationId == null ? null : this.filters.locationId, 
        this.filters.officeId == null ? null : this.filters.officeId, 
        this.filters.positionId == null ? null : this.filters.positionId
      ).subscribe((data) => {
      this.employees = data.json() as Employee[];
      this.employeeSearchControl.setValue(this.employees.find(e => e.id == this.filters.employeeId));
      this.rendered = this.rendered.concat(this.employees.slice(this.rendered.length, this.rendered.length + 8))

      this.filteredDivisions = this.divSearchControl.valueChanges
          .startWith(null)
          .map(name => this.filterDivs(name));
          
      this.filteredEmployees = this.employeeSearchControl.valueChanges
          .startWith(null)
          .map(name => this.filterEmpls(name));

      this.filteredOrgs = this.OrgFormControl.valueChanges
          .startWith(null)
          .map(name => this.filterOrgs(name));

      this.filteredOffices = this.OfficeFormControl.valueChanges
          .startWith(null)
          .map(name => this.filterOffices(name));

      this.filteredLocations = this.locaFormControl.valueChanges
          .startWith(null)
          .map(name => this.filterLocations(name));

      this.filteredPositions = this.PosFormControl.valueChanges
          .startWith(null)
          .map(name => this.filterPositions(name));

      this.inProgress = false;
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.inProgress = false;
    });
  }

  filterDivs(val: any) {
    if(typeof(val) == "object") return;
    return val ? this.divisions.filter(d => d.name.toUpperCase().indexOf(val.toUpperCase()) > -1)
               : this.divisions;
  }

  filterEmpls(val: any) {
    if(typeof(val) == "object") return;
    return val ? this.employees.filter(e => e.fio == null ? false : e.fio.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.employees;
  }

  filterOrgs(val: any) {
    if(typeof(val) == "object") return;
    return val ? this.organizations.filter(o => o.name == null ? false : o.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.organizations;
  }

  filterOffices(val: any) {
    if(typeof(val) == "object") return;
    return val ? this.offices.filter(o => o.name == null ? false : o.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.offices;
  }

  filterLocations(val: any) {
    if(typeof(val) == "object") return;
    return val ? this.locations.filter(l => l.name == null ? false : l.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.locations;
  }

  filterPositions(val: any) {
    if(typeof(val) == "object") return;
    return val ? this.positions.filter(p => p.position == null ? false : p.position.toLowerCase().indexOf(val.toLowerCase()) === 0)
               : this.positions;
  }

  create(){
    this.router.navigate(['/employee/create']);
  }

  onEmployeeSearch(){
    
  }

  displayDivName(div:Division): string {
    if(div) return div.name;
  }

  displayEmpName(emp:Employee):string{
    if(emp) return emp.fio;
  }

  displayOrgName(org:Organization):string{
    if(org) return org.name;
  }

  displayOfficeName(off:Office):string{
    if(off) return off.name;
  }

  displayLocaName(loc:Location):string{
    if(loc) return loc.name;
  }

  displayPosName(pos:Position):string{
    if(pos) return pos.position;
  }

  fillRendered(){
    this.rendered = this.rendered.concat(this.employees.slice(this.rendered.length, this.rendered.length + 5))
  }

  navigate(){
    this.router.navigate(['/employee'],  { queryParams: { 
      division: this.filters.divisionId,
      employee: this.filters.employeeId,
      active: this.filters.active,
      organization: this.filters.organizationId,
      position : this.filters.positionId,
      office: this.filters.officeId,
      location: this.filters.locationId
    } });
    this.loadEmployees();
  }

  activeChanged(){
    let jopa = this.filters.active;
    this.filters.active = !jopa;
    this.navigate();
  }

  divisionSelected(){
    this.filters.divisionId = this.divSearchControl.value.id;
    this.navigate();
  }

  employeeSelected(){
    this.filters.employeeId = this.employeeSearchControl.value.id;
    this.navigate();
  }

  orgSelected(){
    this.filters.organizationId = this.OrgFormControl.value.id;
    this.navigate();
  }

  officeSelected(){
    this.filters.officeId = this.OfficeFormControl.value.id;
    this.navigate();
  }

  locaSelected(){
    this.filters.locationId = this.locaFormControl.value.id;
    this.navigate();
  }

  posSelected(){
    this.filters.positionId = this.PosFormControl.value.id;
    this.navigate();
  }

  dropSelectedDiv(){
    this.divSearchControl.setValue('');
    this.filters.divisionId = null;
    this.navigate();
  }

  dropSelectedEmp(){
    this.filters.employeeId = null;
    this.employeeSearchControl.setValue("");
    this.navigate();
  }

  dropSelectedOrg(){
    this.filters.organizationId = null;
    this.OrgFormControl.setValue("");
    this.navigate();
  }

  dropSelectedOffice(){
    this.filters.officeId = null;
    this.OfficeFormControl.setValue("");
    this.navigate();
  }

  dropSelectedLocation(){
    this.filters.locationId = null;
    this.locaFormControl.setValue("");
    this.navigate();
  }

  dropSelectedPos(){
    this.filters.positionId = null;
    this.PosFormControl.setValue("");
    this.navigate();
  }
  
}
