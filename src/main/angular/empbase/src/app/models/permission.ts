import { Employee } from './employee'; 
import { Role } from './role'; 
import { Application } from './application'; 

export class Permission{
    public id?:number;
    constructor(
        public name:string,
        public application:Application,
        public roles?:Role[]
    ){}
}