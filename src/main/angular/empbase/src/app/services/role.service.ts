import { Injectable } from '@angular/core';
import { Role } from '../models/role';
import { Employee } from '../models/employee';
import { Http }    from '@angular/http';

@Injectable()
export class RoleService{

    constructor(private http: Http){}

    getAll(){
        return this.http.get('/api/role/all');
    }

    getRole(id:number){
        return this.http.get('/api/role/' + id);
    }

    create(role:Role){
        return this.http.post('/api/role', role);
    }

    update(role:Role){
        return this.http.put('/api/role', role);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/role/' + id);
    }

    getEmployeesByRole(id:number){
        return this.http.get('/api/role/' + id + '/employee');
    }

    getRolesByEmployee(id:number){
        return this.http.get('/api/employee/' + id + '/role');
    }

}