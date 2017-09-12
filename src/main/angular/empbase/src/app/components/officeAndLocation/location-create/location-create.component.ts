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
  selector: 'app-location-create',
  templateUrl: './location-create.component.html',
  styleUrls: ['./location-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class LocationCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  locationForm:FormGroup;
  offices:Office[];
  office:Office;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private os:OfficeService,
    private route:ActivatedRoute,
    private ls:LocationService) {
      this.inProgress = true;
      this.createForm();
      this.inProgress = false;
    }

  ngOnInit() {
    this.os.getAll().subscribe((data) => {
      this.mode = "Query";
      this.offices = data.json() as Office[];

      this.route.params.subscribe((params: Params) => {
        this.mode = "Query";
          if(params['officeId']){
            this.os.getOffice(params['officeId']).subscribe(resp => {
              this.office = resp.json() as Office;
              let selected = null;
              this.offices.forEach(o => {
                if(o.name == this.office.name) selected = o;
              });
              this.locationForm.setValue({
                name: '',
                shortName: '',
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
          }
        });

      this.mode = "Indeterminate";
      this.inProgress = false;
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
      let location:Location = new Location(
        this.locationForm.value.name,
        this.locationForm.value.shortName,
        this.locationForm.value.office
      );
      this.ls.create(location).subscribe(
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
