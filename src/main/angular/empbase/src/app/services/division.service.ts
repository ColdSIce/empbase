import { Injectable } from '@angular/core';
import { Division } from '../models/division';
import { Http }    from '@angular/http';

@Injectable()
export class DivisionService{

    constructor(private http: Http){}

    getTreeByRoot(id:number){
        return this.http.get('/api/division/' + id + '/tree');
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

    getAllEmployeesByDivision(divId:number, active?:boolean, employee?:string, location?:string, office?:string, position?:string){
        let anyParam:boolean = active != null || employee != null || location != null || office != null || position != null;
        let url = '/api/division/' + divId + '/employee/all';
        if(anyParam) url += '?';
        if(active != null) url += 'active=' + active;
        if(employee != null) url += '&employee=' + employee;
        if(location != null) url += '&location=' + location;
        if(office != null) url += '&office=' + office;
        if(position != null) url += '&position=' + position;
        return this.http.get(url);
    }

    getHead(divId:number){
        return this.http.get('/api/division/' + divId + '/head');
    }

    getAllHeads(divId:number){
        return this.http.get('/api/division/' + divId + '/head/all');
    }

}