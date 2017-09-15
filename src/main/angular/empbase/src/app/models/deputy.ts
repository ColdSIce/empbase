import { Employee } from './employee';

export class Deputy{
    public id?:number;
    constructor(
        public head:Employee,
        public deputy:Employee
    ){}
}