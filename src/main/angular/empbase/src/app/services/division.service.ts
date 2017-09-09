import { Injectable } from '@angular/core';
import { Division } from '../models/division';
import { Http }    from '@angular/http';

@Injectable()
export class DivisionService{

    constructor(private http: Http){}

    getDeputy(id:number){
        return this.http.get('/api/division/' + id);
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

    getAllEmployeesByDivision(divId:number){
        return this.http.get('/api/division/' + divId + '/employee/all');
    }

    getHead(divId:number){
        return this.http.get('/api/division/' + divId + '/head');
    }

    getAllHeads(divId:number){
        return this.http.get('/api/division/' + divId + '/head/all');
    }

}