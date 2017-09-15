import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';

@Pipe({
  name: 'employeeByFio'
})
export class EmployeeByFioPipe implements PipeTransform {

  transform(employees: Array<Employee>, prop: string): Array<any> {
      return prop ? employees.filter(e => e.fio.toLowerCase().indexOf(prop.toLowerCase()) === 0)
               : employees;
  }

}
