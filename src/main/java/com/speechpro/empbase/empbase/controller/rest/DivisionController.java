package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Division;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.service.DivisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DivisionController {
    @Autowired
    private DivisionService divisionService;

    @RequestMapping(value = "/division/{id}/employees/all", method = RequestMethod.GET)
    ResponseEntity<List<Employee>> getAll(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<List<Employee>>(divisionService.getEmployeesByDivisionRecursively(division), HttpStatus.OK);
    }
}
