import { Permission } from './permission';
import { Employee } from './employee'; 

export class Role{
    public selected:boolean = false;
    public id?:number;
    constructor(
        public name:string,
        public employees?:Employee[],
        public permissions?:Permission[]
    ){}
}