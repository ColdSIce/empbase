import { Injectable } from '@angular/core';
import { Permission } from '../models/permission';
import { Http }    from '@angular/http';

@Injectable()
export class PermissionService{

    constructor(private http: Http){}

    getAll(){
        return this.http.get('/api/permission/all');
    }

    getPermission(id:number){
        return this.http.get('/api/permission/' + id);
    }

    create(permission:Permission){
        return this.http.post('/api/permission', permission);
    }

    update(permission:Permission){
        return this.http.put('/api/permission', permission);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/permission/' + id);
    }

}