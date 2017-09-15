import { ImageType } from './imageType';

export class Image{
    public id?:number;
    constructor(
        public binImage:HTMLImageElement,
        public imageType:ImageType
    ){}
}