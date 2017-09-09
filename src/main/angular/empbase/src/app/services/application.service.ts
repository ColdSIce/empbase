import { Injectable } from '@angular/core';
import { Application } from '../models/application';
import { Http }    from '@angular/http';

@Injectable()
export class ApplicationService{

    constructor(private http: Http){}

    getApplication(id:number){
        return this.http.get('/api/application/' + id);
    }

    create(application:Application){
        return this.http.post('/api/application', application);
    }

    update(application:Application){
        return this.http.put('/api/application', application);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/application/' + id);
    }

}