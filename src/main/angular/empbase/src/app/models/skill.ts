import { SkillGroup } from './skillGroup';
import { Employee } from './employee'; 

export class Skill{
    public id?:number;
    constructor(
        public name:string,
        public skillGroup:SkillGroup,
        public employees?:Employee[]
    ){}
}