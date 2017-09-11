package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Office;
import com.speechpro.empbase.empbase.service.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class OfficeController {
    @Autowired
    private OfficeService officeService;

    @RequestMapping(value = "/office", method = RequestMethod.GET)
    List<Office> getOffice(){
        return officeService.getAll();
    }

    @RequestMapping(value = "/office/{id}", method = RequestMethod.GET)
    Office getOffice(@PathVariable Long id){
        return officeService.getById(id);
    }

    @RequestMapping(value = "/office", method = RequestMethod.POST)
    Office createOffice(@RequestBody Office office){
        return officeService.create(office);
    }

    @RequestMapping(value = "/office", method = RequestMethod.PUT)
    Office updateOffice(@RequestBody Office office){
        return officeService.update(office);
    }

    @RequestMapping(value = "/office/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Office> deleteOffice(@PathVariable Long id){
        Office office = officeService.getById(id);
        if(office != null){
            officeService.delete(office);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
