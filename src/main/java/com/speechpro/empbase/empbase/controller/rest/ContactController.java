package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Contact;
import com.speechpro.empbase.empbase.model.entities.ContactType;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.service.ContactService;
import com.speechpro.empbase.empbase.service.ContactTypeService;
import com.speechpro.empbase.empbase.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private ContactTypeService contactTypeService;

    @Autowired
    private EmployeeService employeeService;


    @RequestMapping(value = "/contact/{id}", method = RequestMethod.GET)
    Contact getContact(@PathVariable Long id){
        return contactService.getById(id);
    }

    @RequestMapping(value = "/contact/{empId}", method = RequestMethod.POST)
    Contact createContact(@PathVariable Long empId,
                          @RequestBody Contact contact){
        Employee employee = employeeService.getById(empId);
        contact.setEmployee(employee);
        Contact cont =  contactService.create(contact);
        if(!employee.getContacts().contains(cont)){
            employee.getContacts().add(cont);
            employeeService.update(employee);
        }
        return cont;
    }

    @RequestMapping(value = "/contact", method = RequestMethod.PUT)
    Contact updateContact(@RequestBody Contact contact){
        Contact cont = contactService.getById(contact.getId());
        cont.setContactType(contact.getContactType());
        cont.setValue(contact.getValue());
        return contactService.update(cont);
    }

    @RequestMapping(value = "/contact/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Contact> deleteContact(@PathVariable Long id){
        Contact contact = contactService.getById(id);
        if(contact != null){
            Employee employee = contact.getEmployee();
            employee.getContacts().remove(contact);
            employeeService.update(employee);
            contactService.delete(contact);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/employee/{id}/contact", method = RequestMethod.GET)
    ResponseEntity<List<Contact>> getContactByEmployee(@PathVariable Long id){
        Employee employee = employeeService.getById(id);
        if(employee != null){
            return new ResponseEntity<>(contactService.getByEmployee(employee), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/contact_type", method = RequestMethod.GET)
    List<ContactType> getAllContactTypes(){
        return contactTypeService.getAll();
    }

    @RequestMapping(value = "/contact_type/{id}", method = RequestMethod.GET)
    ContactType getContactType(@PathVariable Long id){
        return contactTypeService.getById(id);
    }

    @RequestMapping(value = "/contact_type", method = RequestMethod.POST)
    ContactType createContactType(@RequestBody ContactType contactType){
        return contactTypeService.create(contactType);
    }

    @RequestMapping(value = "/contact_type", method = RequestMethod.PUT)
    ContactType updateContactType(@RequestBody ContactType contactType){
        return contactTypeService.update(contactType);
    }

    @RequestMapping(value = "/contact_type/{id}", method = RequestMethod.DELETE)
    ResponseEntity<ContactType> deleteContactType(@PathVariable Long id){
        ContactType contactType = contactTypeService.getById(id);
        if(contactType != null){
            contactTypeService.delete(contactType);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
