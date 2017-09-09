import { Injectable } from '@angular/core';
import { Organization } from '../models/organization';
import { Http }    from '@angular/http';

@Injectable()
export class OrganizationService{

    constructor(private http: Http){}

    getAll(){
        return this.http.get('/api/organization/all');
    }

    getOrganization(id:number){
        return this.http.get('/api/organization/' + id);
    }

    create(organization:Organization){
        return this.http.post('/api/organization', organization);
    }

    update(organization:Organization){
        return this.http.put('/api/organization', organization);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/organization/' + id);
    }

}