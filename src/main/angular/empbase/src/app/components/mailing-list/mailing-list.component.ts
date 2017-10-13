import { Component, OnInit } from '@angular/core';
import { Division } from './../../models/division';
import { DivisionService } from './../../services/division.service';
import { Employee } from './../../models/employee';
import { EmployeeService } from './../../services/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from './../../router.animation';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-mailing-list',
  templateUrl: './mailing-list.component.html',
  styleUrls: ['./mailing-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MailingListComponent implements OnInit {

  inProgress = true;
  divisions:Division[];
  employees:Employee[];
  selectedDivs:number[] = [];
  filteredEmployees:Employee[];
  selectedEmployees:number[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ds:DivisionService,
    private es:EmployeeService,
    private ts:ToasterService
  ) { }

  ngOnInit() {
    this.ds.getFlatByRoot().subscribe(
      (data) => {
        this.divisions = data.json() as Division[];

        this.es.getActive().subscribe(
          (data) => {
            this.employees = data.json() as Employee[];
            this.inProgress = false;
          },
          (error) => {
            this.ts.pop('error', 'Ошибка', error);
            this.inProgress = false;
          }
        );

      },
      (error) => {
        this.ts.pop('error', 'Ошибка', error);
        this.inProgress = false;
      }
    );
  }

  divCheckListener(div){
    let divs = [];
    this.fillDivs(div, divs);
    divs.forEach(d => this.divChecked(d));
  }

  fillDivs(div, divs:number[]){
    divs.push(div.id);
    this.divisions.forEach(d => {
      if(d.rootDivisionId == div.id) return this.fillDivs(d, divs);
    });
  }

  divChecked(div){
    console.log(div);
    let index = this.selectedDivs.indexOf(div);
    if(index > -1){
      this.selectedDivs.splice(index, 1);
      this.filteredEmployees = this.filterEmployees();
      this.selectedEmployees = [];
      this.filteredEmployees.forEach(e => {
        this.selectedEmployees.push(e.id);
      });

    } else {
      this.selectedDivs.push(div);
      this.filteredEmployees = this.filterEmployees();
      this.filteredEmployees.forEach(e => {
        if(!this.selectedEmployees.includes(e.id)) this.selectedEmployees.push(e.id);
      });
    } 
    console.log(this.selectedDivs);
  }

  emplChecked(emp){
    let index = this.selectedEmployees.indexOf(emp.id);
    if(index > -1) this.selectedEmployees.splice(index, 1);
    else this.selectedEmployees.push(emp.id);
  }

  filterEmployees(){
    if(this.employees) 
    return this.selectedDivs ? this.employees.filter(e => e.divisionId == null ? false : this.selectedDivs.includes(e.divisionId)) : [];
  }

  getEmails(){
    let emails = "";
    let selected = this.employees ? this.employees.filter(e => this.selectedEmployees.includes(e.id)) : [];
    selected.forEach(e => {
      e.contacts.forEach(c => {
        if(c.contactType.name === "Email") emails = emails + c.value + ",";
      });
    })
    return emails;
  }

}
