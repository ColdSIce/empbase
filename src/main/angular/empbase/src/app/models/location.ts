import { Office } from './office';

export class Location{
    constructor(
        public name:string,
        public shortName:string,
        public office:Office
    ){}
}