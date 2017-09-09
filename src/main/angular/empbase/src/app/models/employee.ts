import { Position } from './position';
import { Skill } from './skill';
import { Image } from './image';
import { Location } from './location';
import { Organization } from './organization';

export class Employee{
    constructor(
        public position:Position,
        public divisionId:number,
        public skills:Skill[],
        public image:Image,
        public fio:string,
        public fioEng:string,
        public gender:string,
        public uname:string,
        public onesId:string,
        public birthDate:Date,
        public created:Date,
        public updated:Date,
        public updatedBy:number,
        public location:Location,
        public organization:Organization,
        public active:boolean
    ){}
}