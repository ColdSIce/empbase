package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.transport.EmployeeTransport;
import com.speechpro.empbase.empbase.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/employee", method = RequestMethod.GET)
    List<Employee> getAll(){
        return employeeService.getAll();
    }

    @RequestMapping(value = "/employee/{id}", method = RequestMethod.GET)
    EmployeeTransport get(@PathVariable Long id){
        return employeeService.getById(id).toTransport();
    }

    @RequestMapping(value = "/employee", method = RequestMethod.POST)
    EmployeeTransport create(@RequestBody EmployeeTransport employeeTransport){
        return employeeService.create(employeeTransport);
    }

    @RequestMapping(value = "/employee", method = RequestMethod.PUT)
    EmployeeTransport update(@RequestBody EmployeeTransport employeeTransport){
        return employeeService.update(employeeTransport);
    }

    @RequestMapping(value = "/employee/{id}", method = RequestMethod.DELETE)
    ResponseEntity<EmployeeTransport> deletePost(@PathVariable Long id){
        Employee employee = employeeService.getById(id);
        if(employee != null){
            employeeService.delete(employee);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
