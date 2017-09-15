import { Employee } from './employee';

export class Division{
    public id?:number;
    constructor(
        public name:string,
        public nameEng:string,
        public link:string,
        public email:string,
        public rootDivisionId:number,
        public oldId:number,
        public head:Employee,
        public divisions?:Division[]
    ){}
}