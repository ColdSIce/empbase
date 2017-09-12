import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Office } from '../../../models/office';
import { OfficeService } from '../../../services/office.service';
import { Location } from '../../../models/location';
import { LocationService } from '../../../services/location.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class LocationEditComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  locationForm:FormGroup;
  location:Location;
  offices:Office[];

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private os:OfficeService,
    private ls:LocationService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.os.getAll().subscribe((data) => {
      this.mode = "Query";
      this.offices = data.json() as Office[];

      this.route.params.subscribe((params: Params) => {
        this.mode = "Query";
          this.ls.getLocation(params['key']).subscribe(resp => {
            this.location = resp.json() as Location;
            let selected = null;
            this.offices.forEach(o => {
              if(o.name == this.location.office.name) selected = o;
            });
            this.locationForm.setValue({
              name: this.location.name,
              shortName: this.location.shortName,
              office: selected
            });
            this.mode = "Indeterminate";
            this.inProgress = false;
          },
            (error) => {
              this.ts.pop('error', 'Ошибка', error);
              this.inProgress = false;
              this.mode = "Indeterminate";
            }
          ) 
        });
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
      this.mode = "Indeterminate";
      this.inProgress = false;
    });
    
  }

  createForm(){
    this.locationForm = this.fb.group ({
      name: ['', Validators.required ],
      shortName: [''],
      office:['', Validators.required ]
    });
  }

  onSubmit(){
    if(this.locationForm.valid){
      this.location.name = this.locationForm.value.name;
      this.location.shortName = this.locationForm.value.shortName;
      this.location.office = this.locationForm.value.office;
      this.ls.update(this.location).subscribe(
        (data) => {
          this.locationForm.reset();
          this.router.navigate(['/location/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.locationForm.reset();
    this.router.navigate(['/officeAndLocation']);
  }

}
