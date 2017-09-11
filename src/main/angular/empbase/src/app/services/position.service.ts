import { Injectable } from '@angular/core';
import { Position } from '../models/position';
import { Http }    from '@angular/http';

@Injectable()
export class PositionService{

    constructor(private http: Http){}

    getAll(){
        return this.http.get('/api/position/all');
    }

    getPosition(id:number){
        return this.http.get('/api/position/' + id);
    }

    create(position:Position){
        return this.http.post('/api/position', position);
    }

    update(position:Position){
        return this.http.put('/api/position', position);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/position/' + id);
    }

}