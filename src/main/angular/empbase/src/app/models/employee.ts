import { Position } from './position';
import { Skill } from './skill';
import { Image } from './image';
import { Location } from './location';
import { Contact } from './contact';
import { Organization } from './organization';

export class Employee{
    public id?:number;
    constructor(
        public position:Position,
        public divisionId:number,
        public fio:string,
        public fioEng:string,
        public gender:string,
        public uname:string,
        public onesId:string,
        public birthDate:Date,
        public created:Date,
        public updated:Date,
        public location:Location,
        public organization:Organization,
        public active:boolean,
        public skills?:Skill[],
        public contacts?:Contact[],
        public imageId?:number,
        public updatedBy?:number
    ){}
}