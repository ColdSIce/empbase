import { Component, OnInit, Input } from '@angular/core';
import { Division } from '../../models/division';
import { DivisionService } from '../../services/division.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-division-in-list',
  templateUrl: './division-in-list.component.html',
  styleUrls: ['./division-in-list.component.css']
})
export class DivisionInListComponent implements OnInit {

  @Input('division') division:Division;
  @Input('margin') margin:number;
  innerMargin:number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.innerMargin = this.margin + 15;
  }

  goToDiv(id:number){
    if(id) this.router.navigate(['/division/view/' + id]);
  }

}
