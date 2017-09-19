import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { Http }    from '@angular/http';

@Injectable()
export class EmployeeService{

    constructor(private http: Http){}

    getEmployee(id:number){
        return this.http.get('/api/employee/' + id);
    }

    create(employee:Employee){
        return this.http.post('/api/employee', employee);
    }

    update(employee:Employee){
        return this.http.put('/api/employee', employee);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/employee/' + id);
    }

    getAll(){
        return this.http.get('/api/employee/');
    }

    getActive(){
        return this.http.get('/api/employee/active');
    }

}