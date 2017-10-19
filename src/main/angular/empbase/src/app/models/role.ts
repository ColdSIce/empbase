import { Permission } from './permission';
import { Employee } from './employee'; 

export class Role{
    public id?:number;
    constructor(
        public name:string,
        public employees?:Employee[],
        public permissions?:Permission[]
    ){}
}