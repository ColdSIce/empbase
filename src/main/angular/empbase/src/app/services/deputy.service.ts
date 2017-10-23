import { Injectable } from '@angular/core';
import { Deputy } from '../models/deputy';
import { Http }    from '@angular/http';

@Injectable()
export class DeputyService{

    constructor(private http: Http){}

    getDeputy(id:number){
        return this.http.get('/api/deputy/' + id);
    }

    getDeputyByHead(id:number){
        return this.http.get('/api/employee/' + id + '/replaced_by');
    }

    create(deputy:Deputy){
        return this.http.post('/api/deputy', deputy);
    }

    update(deputy:Deputy){
        return this.http.put('/api/deputy', deputy);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/deputy/' + id);
    }

}