package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Organization;
import com.speechpro.empbase.empbase.repository.OrganizationRepository;
import com.speechpro.empbase.empbase.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OrganizationServiceImpl implements OrganizationService{

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public List<Organization> getAll() {
        return organizationRepository.findAll();
    }

    @Override
    public Organization getById(Long id) {
        return organizationRepository.findOne(id);
    }

    @Override
    public Organization create(Organization organization) {
        return organizationRepository.save(organization);
    }

    @Override
    public Organization update(Organization organization) {
        return organizationRepository.save(organization);
    }

    @Override
    public void delete(Organization organization) {
        organizationRepository.delete(organization);
    }
}
