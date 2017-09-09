import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Organization } from '../../../models/organization';
import { OrganizationService } from '../../../services/organization.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class OrganizationComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  organization:Organization;

  constructor(
    private os:OrganizationService,
    private ts:ToasterService,
    private route:ActivatedRoute, 
    private router:Router,) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.os.getOrganization(params['key']).subscribe(resp => {
          this.organization = resp.json() as Organization;
          this.mode = "Indeterminate";
          this.inProgress = false;
        },
          (error) => {
            this.ts.pop('error', 'Ошибка', error);
            this.mode = "Indeterminate";
            this.inProgress = false;
          }
        ) 
      });
  }

  edit(id:number){
    this.router.navigate(['/organization/edit/' + id]);
  }

  delete(id:number){
    this.os.delete(id).subscribe(
      (resp) => this.router.navigate(['/organization']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  toOrganizations(){
    this.router.navigate(['/organization']);
  }

}
