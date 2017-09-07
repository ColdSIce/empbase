package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.ContactType;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ContactTypeService {
    List<ContactType> getAll();
    ContactType getById(Long id);
    ContactType create(ContactType contactType);
    ContactType update(ContactType contactType);
    void delete(ContactType contactType);
}
