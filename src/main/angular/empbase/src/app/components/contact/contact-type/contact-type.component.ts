import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { ContactType } from '../../../models/contactType';
import { ContactService } from '../../../services/contact.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-contact-type',
  templateUrl: './contact-type.component.html',
  styleUrls: ['./contact-type.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ContactTypeComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  ct:ContactType;

  constructor(
    private cs:ContactService,
    private ts:ToasterService,
    private route:ActivatedRoute, 
    private router:Router,) {
      this.inProgress = true;
    }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.mode = "Query";
        this.cs.getContactType(params['key']).subscribe(resp => {
          this.ct = resp.json() as ContactType;
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
    this.router.navigate(['/contactType/edit/' + id]);
  }

  delete(id:number){
    this.cs.deleteContactType(id).subscribe(
      (resp) => this.router.navigate(['/contactType']),
      (error) => this.ts.pop('error', 'Ошибка', error)
    );
  }

  cts(){
    this.router.navigate(['/contactType']);
  }
}
