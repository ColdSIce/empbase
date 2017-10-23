package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.*;
import com.speechpro.empbase.empbase.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
public class DivisionController {
    @Autowired
    private DivisionService divisionService;

    @Autowired
    private LocationService locationService;

    @Autowired
    private OfficeService officeService;

    @Autowired
    private PositionService positionService;

    @Autowired
    private OrganizationService organizationService;

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/division/{id}/tree", method = RequestMethod.GET)
    ResponseEntity<Division> getTreeByRoot(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Division>(divisionService.getTreeByRoot(division), HttpStatus.OK);
    }

    @RequestMapping(value = "/division/{id}/flat", method = RequestMethod.GET)
    ResponseEntity<List<Division>> getFlatByRoot(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<List<Division>>(divisionService.getFlatByRoot(division), HttpStatus.OK);
    }

    @RequestMapping(value = "/division/employee/all", method = RequestMethod.GET)
    ResponseEntity<List<Employee>> getAll(
            @RequestParam(name = "active", required = false) Boolean active,
            @RequestParam(name = "locationId", required = false) Long locationId,
            @RequestParam(name = "divisionId", required = false) Long divisionId,
            @RequestParam(name = "officeId", required = false) Long officeId,
            @RequestParam(name = "positionId", required = false) Long positionId,
            @RequestParam(name = "employeeId", required = false) Long empId,
            @RequestParam(name = "organizationId", required = false) Long orgId,
            @RequestParam(name = "skills", required = false) List<Long> skillIds){



        final Location location;
        if(locationId != null) location = locationService.getById(locationId);
        else location = null;

        final Office office;
        if(officeId != null) office = officeService.getById(officeId);
        else office = null;

        final Position position;
        if(positionId != null) position = positionService.getById(positionId);
        else position = null;

        final Organization organization;
        if(orgId != null) organization = organizationService.getById(orgId);
        else organization = null;

        List<Employee> unfiltered;
        if(divisionId == null) unfiltered = employeeService.getAll();
        else {
            Division division = divisionService.getById(divisionId);
            if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            unfiltered = divisionService.getEmployeesByDivisionRecursively(division);
        }

        List<Employee> employees = unfiltered.stream()
                .filter(e -> e.getFio() != null && !e.getFio().equals(""))
                .filter(e -> active == null || e.isActive() == active)
                .filter(e -> empId == null || e.getId().equals(empId))
                .filter(e -> location == null || (e.getLocation() != null && e.getLocation().equals(location)))
                .filter(e -> organization == null || (e.getOrganization() != null && e.getOrganization().equals(organization)))
                .filter(e -> office == null || (e.getLocation() != null && e.getLocation().getOffice() != null && e.getLocation().getOffice().equals(office)))
                .filter(e -> position == null || (e.getPosition() != null && e.getPosition().equals(position)))
                .collect(Collectors.toList());

        Collections.sort(employees, (e1, e2) -> e1.getFio().compareTo(e2.getFio()));

        return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
    }

    @RequestMapping(value = "/division/all", method = RequestMethod.GET)
    List<Division> get(){
        return divisionService.getAll();
    }

    @RequestMapping(value = "/division/{id}", method = RequestMethod.GET)
    Division get(@PathVariable Long id){
        return divisionService.getById(id);
    }

    @RequestMapping(value = "/division/{id}/all", method = RequestMethod.GET)
    ResponseEntity<List<Division>> getByParent(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<List<Division>>(divisionService.getAllByParent(division), HttpStatus.OK);
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
    @Transactional
    ResponseEntity<Division> delete(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division != null){
            List<Employee> employees = divisionService.getEmployeesByDivision(division);
            employees.forEach(e -> {
                e.setDivisionId(null);
                employeeService.update(e);
            });
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
