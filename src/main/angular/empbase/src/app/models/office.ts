import { Employee } from './employee';

export class Office{
    constructor(
        public name:string,
        public nameEng:string,
        public shortName:string,
        public head:Employee
    ){}
}