import { ContactType } from './contactType';
import { Employee } from './employee';

export class Contact{
    public id?:number;
    constructor(
        public value:string,
        public contactType:ContactType,
        public employee:Employee
    ){}
}