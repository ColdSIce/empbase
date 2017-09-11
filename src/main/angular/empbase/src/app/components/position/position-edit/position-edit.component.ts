import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Position } from '../../../models/position';
import { PositionService } from '../../../services/position.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-position-edit',
  templateUrl: './position-edit.component.html',
  styleUrls: ['./position-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class PositionEditComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  posForm:FormGroup;
  position:Position;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private ps:PositionService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.ps.getPosition(params['key']).subscribe(resp => {
          this.position = resp.json() as Position;
          this.posForm.setValue({
            name:this.position.position,
            nameEng:this.position.positionEng
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
  }

  createForm(){
    this.posForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''] 
    });
  }

  onSubmit(){
    if(this.posForm.valid){
      this.position.position = this.posForm.value.name;
      this.position.positionEng = this.posForm.value.nameEng;
      this.ps.update(this.position).subscribe(
        (data) => {
          this.posForm.reset();
          this.router.navigate(['/position/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.posForm.reset();
    this.router.navigate(['/position']);
  }

}
