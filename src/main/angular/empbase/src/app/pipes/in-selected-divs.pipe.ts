import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';
import { Division } from '../models/division';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'inSelectedDivs'
})
export class InSelectedDivsPipe implements PipeTransform {

  transform(employees: Array<Employee>, divisions: Array<Division>): any {
    console.log(divisions);
    if(!divisions) return [];
    let result:Employee[] = [];
    employees.forEach(e => {
      if(e.divisionId){
        divisions.forEach(d => {
          if(d.id && d.id == e.divisionId) result.push(e);
        });
      }
    });
    return result;
  }

}
