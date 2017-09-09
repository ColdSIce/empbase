import { ContactType } from './contactType';
import { Employee } from './employee';

export class Contact{
    constructor(
        public value:string,
        public employee:Employee,
        public contactType:ContactType
    ){}
}