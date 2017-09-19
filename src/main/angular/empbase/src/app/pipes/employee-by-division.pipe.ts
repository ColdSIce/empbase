import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';
import { Division } from '../models/division';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Pipe({
  name: 'employeeByDivision'
})
export class EmployeeByDivisionPipe implements PipeTransform {

  transform(employees: Array<Employee>, prop: Division): Array<any> {
      return prop ? employees.filter(e => e.divisionId == null ? false : e.divisionId == prop.id)
               : employees;
  }

}
