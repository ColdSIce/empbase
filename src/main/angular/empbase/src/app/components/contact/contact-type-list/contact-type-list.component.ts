import { Component, OnInit, HostBinding } from '@angular/core';
import { moveIn, fallIn, moveInLeft } from '../../../router.animation';
import { ContactType } from '../../../models/contactType';
import { ContactService } from '../../../services/contact.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-contact-type-list',
  templateUrl: './contact-type-list.component.html',
  styleUrls: ['./contact-type-list.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class ContactTypeListComponent implements OnInit {

  mode = "Indeterminate";
  inProgress = false;
  cts:ContactType[] = [];

  constructor(private router: Router,
    private cs:ContactService,
    private ts:ToasterService) {
    this.inProgress = true;
  }

  ngOnInit() {
    this.cs.getAllContactTypes().subscribe((data) => {
      this.mode = "Query";
      this.cts = data.json() as ContactType[];
    },(error) => {
      this.ts.pop('error', 'Ошибка', error);
    });
    this.mode = "Indeterminate";
    this.inProgress = false;
  }

  create(){
    this.router.navigate(['/contactType/create']);
  }

  goToCT(id:number){
    if(id) this.router.navigate(['/contactType/view/' + id]);
  }

}
