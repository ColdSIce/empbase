import { ImageType } from './imageType';

export class Image{
    constructor(
        public binImage:HTMLImageElement,
        public imageType:ImageType
    ){}
}