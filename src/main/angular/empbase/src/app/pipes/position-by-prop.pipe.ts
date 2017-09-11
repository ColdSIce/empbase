import { Pipe, PipeTransform } from '@angular/core';
import { Position } from '../models/position';

@Pipe({
  name: 'positionByProp'
})
export class PositionByPropPipe implements PipeTransform {

  transform(positions: Array<Position>, prop: string): Array<any> {
      return prop ? positions.filter(p => p.position.toLowerCase().indexOf(prop.toLowerCase()) === 0)
               : positions;
  }

}
