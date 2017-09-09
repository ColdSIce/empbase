import { Injectable } from '@angular/core';
import { Image } from '../models/image';
import { ImageType } from '../models/imageType';
import { Http }    from '@angular/http';

@Injectable()
export class ImageService{

    constructor(private http: Http){}

    getImage(id:number){
        return this.http.get('/api/image/' + id);
    }

    create(image:Image){
        return this.http.post('/api/image', image);
    }

    update(image:Image){
        return this.http.put('/api/image', image);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/image/' + id);
    }

    getImageType(id:number){
        return this.http.get('/api/image_type/' + id);
    }

    createImageType(imageType:ImageType){
        return this.http.post('/api/image_type', imageType);
    }

    updateImageType(imageType:ImageType){
        return this.http.put('/api/image_type', imageType);
    }

    deleteImageType(id:number){
        if(id) return this.http.delete('/api/image_type/' + id);
    }

}