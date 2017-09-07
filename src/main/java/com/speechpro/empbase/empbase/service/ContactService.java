package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Contact;
import com.speechpro.empbase.empbase.model.entities.ContactType;
import com.speechpro.empbase.empbase.model.entities.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContactService {
    List<Contact> getAll();
    List<Contact> getByEmployee(Employee employee);
    Contact getById(Long id);
    Contact create(Contact contact);
    Contact update(Contact contact);
    void delete(Contact contact);
}
