import { Employee } from './employee';

export class Office{
    public selected:boolean = false;
    public id?:number;
    constructor(
        public name:string,
        public nameEng:string,
        public shortName:string,
        public head:Employee
    ){}
}