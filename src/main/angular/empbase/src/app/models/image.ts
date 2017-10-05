import { ImageType } from './imageType';

export class Image{
    public id?:number;
    constructor(
        public binImage:File,
        public imageType?:ImageType
    ){}
}