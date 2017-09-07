package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Office;
import com.speechpro.empbase.empbase.model.entities.Organization;
import com.speechpro.empbase.empbase.repository.OrganizationRepository;
import com.speechpro.empbase.empbase.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class OrganizationController {

    @Autowired
    private OrganizationService organizationService;

    @RequestMapping(value = "/organization/{id}", method = RequestMethod.GET)
    Organization getOrganization(@PathVariable Long id){
        return organizationService.getById(id);
    }

    @RequestMapping(value = "/organization", method = RequestMethod.POST)
    Organization createOrganization(@RequestBody Organization organization){
        return organizationService.create(organization);
    }

    @RequestMapping(value = "/organization", method = RequestMethod.PUT)
    Organization updateOrganization(@RequestBody Organization organization){
        return organizationService.update(organization);
    }

    @RequestMapping(value = "/organization/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Organization> deleteOrganization(@PathVariable Long id){
        Organization organization = organizationService.getById(id);
        if(organization != null){
            organizationService.delete(organization);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
