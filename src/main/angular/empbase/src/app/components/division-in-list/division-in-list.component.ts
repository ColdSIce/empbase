import { Component, OnInit, Input } from '@angular/core';
import { Division } from '../../models/division';
import { DivisionService } from '../../services/division.service';

@Component({
  selector: 'app-division-in-list',
  templateUrl: './division-in-list.component.html',
  styleUrls: ['./division-in-list.component.css']
})
export class DivisionInListComponent implements OnInit {

  @Input('division') division:Division;
  @Input('margin') margin:number;
  innerMargin:number;

  constructor() { }

  ngOnInit() {
    this.innerMargin = this.margin + 15;
  }

}
