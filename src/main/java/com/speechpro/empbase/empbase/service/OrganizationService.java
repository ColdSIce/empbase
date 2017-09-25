package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Organization;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OrganizationService {
    List<Organization> getAll();
    Organization getById(Long id);
    Organization create(Organization organization);
    Organization update(Organization organization);
    void delete(Organization organization);

    Organization getByName(String orgName);
}
