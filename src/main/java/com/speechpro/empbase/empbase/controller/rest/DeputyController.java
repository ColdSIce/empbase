package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Deputy;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.service.DeputyService;
import com.speechpro.empbase.empbase.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DeputyController {
    @Autowired
    private DeputyService deputyService;

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/deputy/{id}", method = RequestMethod.GET)
    Deputy getDeputy(@PathVariable Long id){
        return deputyService.getById(id);
    }

    @RequestMapping(value = "/deputy", method = RequestMethod.POST)
    Deputy createDeputy(@RequestBody Deputy deputy){
        return deputyService.create(deputy);
    }

    @RequestMapping(value = "/deputy", method = RequestMethod.PUT)
    Deputy updateDeputy(@RequestBody Deputy deputy){
        return deputyService.update(deputy);
    }

    @RequestMapping(value = "/deputy/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Deputy> deleteDeputy(@PathVariable Long id){
        Deputy deputy = deputyService.getById(id);
        if(deputy != null){
            deputyService.delete(deputy);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/employee/{id}/replaced_by", method = RequestMethod.GET)
    ResponseEntity<List<Deputy>> getDeputyByHead(@PathVariable Long id){
        Employee employee = employeeService.getById(id);
        if(employee != null){
            return new ResponseEntity<>(deputyService.getByHead(employee), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/employee/{id}/replaces", method = RequestMethod.GET)
    ResponseEntity<List<Deputy>> getDeputyByDeputy(@PathVariable Long id){
        Employee employee = employeeService.getById(id);
        if(employee != null){
            return new ResponseEntity<>(deputyService.getByDeputy(employee), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
