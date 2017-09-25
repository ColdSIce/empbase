package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.service.ContactService;
import com.speechpro.empbase.empbase.service.DivisionService;
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

    @Autowired
    private DivisionService divisionService;

    @Autowired
    private ContactService contactService;

    @RequestMapping(value = "/employee", method = RequestMethod.GET)
    List<Employee> getAll(){
        return employeeService.getAll();
    }

    @RequestMapping(value = "/employee/active", method = RequestMethod.GET)
    List<Employee> getAllActive(){
        return employeeService.getActive();
    }

    @RequestMapping(value = "/employee/{id}", method = RequestMethod.GET)
    Employee get(@PathVariable Long id){
        return employeeService.getById(id);
    }

    @RequestMapping(value = "/employee", method = RequestMethod.POST)
    Employee create(@RequestBody Employee employee){
        return employeeService.create(employee);
    }

    @RequestMapping(value = "/employee", method = RequestMethod.PUT)
    Employee update(@RequestBody Employee employee){
        return employeeService.update(employee);
    }

    @RequestMapping(value = "/employee/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Employee> delete(@PathVariable Long id){
        Employee employee = employeeService.getById(id);
        if(employee != null){
            employee.getContacts().forEach(c -> contactService.delete(c));
            employeeService.delete(employee);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
