import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { ContactType } from '../../../models/contactType';
import { ContactService } from '../../../services/contact.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-contact-type-create',
  templateUrl: './contact-type-create.component.html',
  styleUrls: ['./contact-type-create.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ContactTypeCreateComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  ctForm:FormGroup;

  constructor(private fb:FormBuilder, 
    private router:Router,
    private ts:ToasterService,
    private cs:ContactService) {
      this.inProgress = true;
      this.createForm();
      this.inProgress = false;
    }

  ngOnInit() {
  }

  createForm(){
    this.ctForm = this.fb.group ({
      name: ['', Validators.required ],
      nameEng: [''] 
    });
  }

  onSubmit(){
    if(this.ctForm.valid){
      let ct:ContactType = new ContactType(
        this.ctForm.value.name,
        this.ctForm.value.nameEng,
        ''
      );
      this.cs.createContactType(ct).subscribe(
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
