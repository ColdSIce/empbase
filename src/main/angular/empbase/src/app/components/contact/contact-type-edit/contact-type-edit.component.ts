import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { ContactType } from '../../../models/contactType';
import { ContactService } from '../../../services/contact.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-contact-type-edit',
  templateUrl: './contact-type-edit.component.html',
  styleUrls: ['./contact-type-edit.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ContactTypeEditComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  ctForm:FormGroup;
  ct:ContactType;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private route:ActivatedRoute,
    private cs:ContactService) {
      this.inProgress = true;
      this.createForm();
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.cs.getContactType(params['key']).subscribe(resp => {
          this.ct = resp.json() as ContactType;
          this.ctForm.setValue({
            name:this.ct.name,
            nameEng:this.ct.nameEng
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
    this.ctForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''] 
    });
  }

  onSubmit(){
    if(this.ctForm.valid){
      this.ct.name = this.ctForm.value.name;
      this.ct.nameEng = this.ctForm.value.nameEng;
      this.cs.updateContactType(this.ct).subscribe(
        (data) => {
          this.ctForm.reset();
          this.router.navigate(['/contactType/view/' + data.json().id]);
        },
        (error) => {
          this.ts.pop('error', 'Ошибка', error);
        }
      );
    }
  }

  cancel(){
    this.ctForm.reset();
    this.router.navigate(['/contactType']);
  }

}
