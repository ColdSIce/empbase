import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../models/skill';
import { SkillGroup } from '../models/skillGroup';

@Pipe({
  name: 'skillByGroupId'
})
export class SkillByGroupIdPipe implements PipeTransform {

  transform(skills: Array<Skill>, prop: number): Array<any> {
    return prop ? skills.filter(s => s.skillGroup == null ? false : s.skillGroup.id == prop)
              : [];
  }

}
