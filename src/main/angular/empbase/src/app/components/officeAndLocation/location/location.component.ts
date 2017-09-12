import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Location } from '../../../models/location';
import { LocationService } from '../../../services/location.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class LocationComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  location:Location;

  constructor(
    private ls:LocationService,
    private ts:ToasterService,
    private route:ActivatedRoute, 
    private router:Router,) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.ls.getLocation(params['key']).subscribe(resp => {
          this.location = resp.json() as Location;
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
    this.router.navigate(['/location/edit/' + id]);
  }

  delete(id:number){
    this.ls.delete(id).subscribe(
      (resp) => this.router.navigate(['/officeAndLocation']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  toOffices(){
    this.router.navigate(['/officeAndLocation']);
  }

}
