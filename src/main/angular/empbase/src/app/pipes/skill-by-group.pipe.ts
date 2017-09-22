import { Pipe, PipeTransform } from '@angular/core';
import { Skill } from '../models/skill';
import { SkillGroup } from '../models/skillGroup';

@Pipe({
  name: 'skillByGroup'
})
export class SkillByGroupPipe implements PipeTransform {

  transform(skills: Array<Skill>, prop: SkillGroup): Array<any> {
    console.log(prop);
    return prop ? skills.filter(s => s.skillGroup == null ? false : s.skillGroup.name == prop.name)
              : skills;
  }

}
