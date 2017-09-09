import { Injectable } from '@angular/core';
import { Location } from '../models/location';
import { Http }    from '@angular/http';

@Injectable()
export class LocationService{

    constructor(private http: Http){}

    getLocation(id:number){
        return this.http.get('/api/location/' + id);
    }

    create(location:Location){
        return this.http.post('/api/location', location);
    }

    update(location:Location){
        return this.http.put('/api/location', location);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/location/' + id);
    }

    getByOfficeId(officeId:number){
        return this.http.get('/api/office/' + officeId + '/location');
    }

}