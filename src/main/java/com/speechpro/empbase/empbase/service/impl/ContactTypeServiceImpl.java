package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.ContactType;
import com.speechpro.empbase.empbase.repository.ContactTypeRepository;
import com.speechpro.empbase.empbase.service.ContactTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ContactTypeServiceImpl implements ContactTypeService{
    @Autowired
    private ContactTypeRepository contactTypeRepository;


    @Override
    public List<ContactType> getAll() {
        return contactTypeRepository.findAll();
    }

    @Override
    public ContactType getById(Long id) {
        return contactTypeRepository.findOne(id);
    }

    @Override
    public ContactType create(ContactType contactType) {
        return contactTypeRepository.save(contactType);
    }

    @Override
    public ContactType update(ContactType contactType) {
        return contactTypeRepository.save(contactType);
    }

    @Override
    public void delete(ContactType contactType) {
        contactTypeRepository.delete(contactType);
    }
}
