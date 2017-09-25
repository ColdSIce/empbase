import { Injectable } from '@angular/core';
import { Division } from '../models/division';
import { Http }    from '@angular/http';

@Injectable()
export class DivisionService{

    constructor(private http: Http){}

    getTreeByRoot(id:number){
        return this.http.get('/api/division/' + id + '/tree');
    }

    getFlatByRoot(){
        return this.http.get('/api/division/85/flat');
    }

    getDivision(id:number){
        return this.http.get('/api/division/' + id);
    }

    getAllByParentDivision(id:number){
        return this.http.get('/api/division/' + id + '/all');
    }

    getAllDivisions(){
        return this.http.get('/api/division/all');
    }

    create(division:Division){
        return this.http.post('/api/division', division);
    }

    update(division:Division){
        return this.http.put('/api/division', division);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/division/' + id);
    }

    getAllEmployeesByDivision(divId?:number, active?:boolean, employeeId?:number, organizationId?:number, locationId?:number, officeId?:number, positionId?:number){
        let anyParam:boolean = active != null || employeeId != null || organizationId != null || locationId != null || officeId != null || positionId != null;
        let url = '/api/division/employee/all';
        if(anyParam) url += '?';
        if(active != null) url += 'active=' + active;
        if(employeeId != null) url += '&employeeId=' + employeeId;
        if(divId != null) url += '&divisionId=' + divId;
        if(organizationId != null) url += '&organizationId=' + organizationId;
        if(locationId != null) url += '&locationId=' + locationId;
        if(officeId != null) url += '&officeId=' + officeId;
        if(positionId != null) url += '&positionId=' + positionId;
        return this.http.get(url);
    }

    getHead(divId:number){
        return this.http.get('/api/division/' + divId + '/head');
    }

    getAllHeads(divId:number){
        return this.http.get('/api/division/' + divId + '/head/all');
    }

}