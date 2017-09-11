import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { OrganizationComponent } from '../organization/organization.component';
import { Organization } from '../../../models/organization';
import { OrganizationService } from '../../../services/organization.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-organization-list',
  templateUrl: './organization-list.component.html',
  styleUrls: ['./organization-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OrganizationListComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  organizations:Organization[] = [];

  constructor(private router: Router,
    private os:OrganizationService,
    private ts:ToasterService) {
    this.inProgress = true;
  }

  ngOnInit() {
    this.os.getAll().subscribe((data) => {
      this.mode = "Query";
      this.organizations = data.json() as Organization[];
      this.mode = "Indeterminate";
      this.inProgress = false;
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.mode = "Indeterminate";
      this.inProgress = false;
    });
  }

  create(){
    this.router.navigate(['/organization/create']);
  }

  goToOrganization(orgId:number){
    if(orgId) this.router.navigate(['/organization/view/' + orgId]);
  }

}
