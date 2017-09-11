import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { Position } from '../../../models/position';
import { PositionService } from '../../../services/position.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-position-create',
  templateUrl: './position-create.component.html',
  styleUrls: ['./position-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class PositionCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  posForm:FormGroup;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private ps:PositionService) {
      this.inProgress = true;
      this.createForm();
      this.inProgress = false;
    }

  ngOnInit() {
  }

  createForm(){
    this.posForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''] 
    });
  }

  onSubmit(){
    if(this.posForm.valid){
      let pos:Position = new Position(
        this.posForm.value.name,
        this.posForm.value.nameEng
      );
      this.ps.create(pos).subscribe(
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
