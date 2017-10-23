package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Contact;
import com.speechpro.empbase.empbase.model.entities.ContactType;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.repository.ContactRepository;
import com.speechpro.empbase.empbase.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ContactServiceImpl implements ContactService{
    @Autowired
    private ContactRepository contactRepository;

    @Override
    public List<Contact> getAll() {
        return contactRepository.findAll();
    }

    @Override
    public List<Contact> getByEmployee(Employee employee) {
        return contactRepository.findByEmployee(employee);
    }

    @Override
    public Contact getById(Long id) {
        return contactRepository.findOne(id);
    }

    @Override
    public Contact create(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public Contact update(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public void delete(Contact contact) {
        contactRepository.delete(contact);
    }

    @Override
    public List<Contact> getByContactType(ContactType contactType) {
        return contactRepository.findByContactType(contactType);
    }
}
