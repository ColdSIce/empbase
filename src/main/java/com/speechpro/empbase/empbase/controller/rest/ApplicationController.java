package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Application;
import com.speechpro.empbase.empbase.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @RequestMapping(value = "/application/{id}", method = RequestMethod.GET)
    Application get(@PathVariable Long id){
        return applicationService.getById(id);
    }

    @RequestMapping(value = "/application", method = RequestMethod.POST)
    Application create(@RequestBody Application application){
        return applicationService.create(application);
    }

    @RequestMapping(value = "/application", method = RequestMethod.PUT)
    Application update(@RequestBody Application application){
        return applicationService.update(application);
    }

    @RequestMapping(value = "/application/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Application> delete(@PathVariable Long id){
        Application application = applicationService.getById(id);
        if(application != null){
            applicationService.delete(application);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
