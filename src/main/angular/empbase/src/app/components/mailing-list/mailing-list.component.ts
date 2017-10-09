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
  selectedDivs:Division[];

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

  selectDiv(div){
    console.log(div);
  }

}
