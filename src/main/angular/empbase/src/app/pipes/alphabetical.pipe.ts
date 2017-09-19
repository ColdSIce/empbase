import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../models/employee';

@Pipe({
  name: 'alphabeticalEmployees'
})
export class AlphabeticalPipe implements PipeTransform {
  transform(value: Array<Employee>, args?: any): any {
    value ? value.sort(function(a, b) {
      var textA = a.fio == null ? "" : a.fio.toUpperCase();
      var textB = b.fio == null ? "" : b.fio.toUpperCase();
      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }) : value;
    return value;
  }
}
