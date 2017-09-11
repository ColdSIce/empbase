import { Pipe, PipeTransform } from '@angular/core';
import { Location } from '../models/location';
import { Office } from '../models/office';

@Pipe({
  name: 'roomByOffice'
})
export class RoomByOfficePipe implements PipeTransform {

  transform(locations: Array<Location>, prop: Office): Array<any> {
      return prop ? locations.filter(l => l.office === prop)
               : locations;
  }

}
