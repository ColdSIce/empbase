import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';
import { Division } from '../models/division';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'inSelectedDivs'
})
export class InSelectedDivsPipe implements PipeTransform {
  
  transform(employees: Array<Employee>, divs: Array<number>): Array<any> {
    console.log(divs);
      if(employees) return divs ? employees.filter(e => e.divisionId == null ? false : divs.includes(e.divisionId))
               : [];
  }

}
