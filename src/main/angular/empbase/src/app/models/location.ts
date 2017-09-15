import { Office } from './office';

export class Location{
    public id?:number;
    constructor(
        public name:string,
        public shortName:string,
        public office:Office
    ){}
}