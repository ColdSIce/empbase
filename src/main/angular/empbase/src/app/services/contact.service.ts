import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { ContactType } from '../models/contactType';
import { Http }    from '@angular/http';

@Injectable()
export class ContactService{

    constructor(private http: Http){}

    getContact(id:number){
        return this.http.get('/api/contact/' + id);
    }

    create(contact:Contact, empId:number){
        if(empId) return this.http.post('/api/contact/' + empId, contact);
    }

    update(contact:Contact){
        return this.http.put('/api/contact', contact);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/contact/' + id);
    }

    getByEmployee(employeeId:number){
        return this.http.get('/api/employee/'+employeeId+'/contact');
    }

    getAllContactTypes(){
        return this.http.get('/api/contact_type/');
    }

    getContactType(id:number){
        return this.http.get('/api/contact_type/' + id);
    }

    createContactType(contactType:ContactType){
        return this.http.post('/api/contact_type', contactType);
    }

    updateContactType(contactType:ContactType){
        return this.http.put('/api/contact_type', contactType);
    }

    deleteContactType(id:number){
        if(id) return this.http.delete('/api/contact_type/' + id);
    }

}