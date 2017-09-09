import { Injectable } from '@angular/core';
import { Office } from '../models/office';
import { Http }    from '@angular/http';

@Injectable()
export class OfficeService{

    constructor(private http: Http){}

    getOffice(id:number){
        return this.http.get('/api/office/' + id);
    }

    create(office:Office){
        return this.http.post('/api/office', office);
    }

    update(office:Office){
        return this.http.put('/api/office', office);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/office/' + id);
    }

}