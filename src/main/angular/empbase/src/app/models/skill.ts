import { SkillGroup } from './skillGroup';
import { Employee } from './employee'; 

export class Skill{
    constructor(
        public name:string,
        public skillGroup:SkillGroup,
        public employees?:Employee[]
    ){}
}