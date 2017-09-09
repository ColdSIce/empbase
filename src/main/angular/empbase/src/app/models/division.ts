import { Employee } from './employee';

export class Division{
    constructor(
        public name:string,
        public nameEng:string,
        public link:string,
        public email:string,
        public rootDivisionId:number,
        public oldId:number,
        public head:Employee
    ){}
}