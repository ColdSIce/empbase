package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Division;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.service.DivisionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class DivisionController {
    @Autowired
    private DivisionService divisionService;

    @RequestMapping(value = "/division/{id}/tree", method = RequestMethod.GET)
    ResponseEntity<Division> getTreeByRoot(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Division>(divisionService.getTreeByRoot(division), HttpStatus.OK);
    }

    @RequestMapping(value = "/division/{id}/employee/all", method = RequestMethod.GET)
    ResponseEntity<List<Employee>> getAll(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<List<Employee>>(divisionService.getEmployeesByDivisionRecursively(division).stream().filter(Employee::isActive).collect(Collectors.toList()), HttpStatus.OK);
    }

    @RequestMapping(value = "/division/all", method = RequestMethod.GET)
    List<Division> get(){
        return divisionService.getAll();
    }

    @RequestMapping(value = "/division/{id}", method = RequestMethod.GET)
    Division get(@PathVariable Long id){
        return divisionService.getById(id);
    }

    @RequestMapping(value = "/division", method = RequestMethod.POST)
    Division create(@RequestBody Division division){
        return divisionService.create(division);
    }

    @RequestMapping(value = "/division", method = RequestMethod.PUT)
    Division update(@RequestBody Division division){
        return divisionService.update(division);
    }

    @RequestMapping(value = "/division/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Division> delete(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division != null){
            divisionService.delete(division);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/division/{id}/head", method = RequestMethod.GET)
    ResponseEntity<Employee> getHead(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Employee>(divisionService.getFirstHead(division), HttpStatus.OK);
    }

    @RequestMapping(value = "/division/{id}/head/all", method = RequestMethod.GET)
    ResponseEntity<List<Employee>> getHeadAll(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(divisionService.getAllHeads(division), HttpStatus.OK);
    }
}
