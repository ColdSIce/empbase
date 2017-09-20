package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.*;
import com.speechpro.empbase.empbase.service.DivisionService;
import com.speechpro.empbase.empbase.service.LocationService;
import com.speechpro.empbase.empbase.service.OfficeService;
import com.speechpro.empbase.empbase.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
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

    @RequestMapping(value = "/division/{id}/tree", method = RequestMethod.GET)
    ResponseEntity<Division> getTreeByRoot(@PathVariable Long id){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<Division>(divisionService.getTreeByRoot(division), HttpStatus.OK);
    }

    @RequestMapping(value = "/division/{id}/employee/all", method = RequestMethod.GET)
    ResponseEntity<List<Employee>> getAll(
            @PathVariable Long id,
            @RequestParam(name = "active", required = false) Boolean active,
            @RequestParam(name = "location", required = false) String locationName,
            @RequestParam(name = "office", required = false) String officeName,
            @RequestParam(name = "position", required = false) String positionName,
            @RequestParam(name = "employee", required = false) String uname,
            @RequestParam(name = "skills", required = false) List<String> skillNames){
        Division division = divisionService.getById(id);
        if(division == null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);

        final Location location;
        if(locationName != null) location = locationService.getByName(locationName);
        else location = null;

        final Office office;
        if(officeName != null) office = officeService.getByName(officeName);
        else office = null;

        final Position position;
        if(positionName != null) position = positionService.getByName(positionName);
        else position = null;

        List<Employee> employees = divisionService.getEmployeesByDivisionRecursively(division).stream()
                .filter(e -> active == null || !active || e.isActive() == active)
                .filter(e -> uname == null || e.getUname().equals(uname))
                .filter(e -> location == null || (e.getLocation() != null && e.getLocation().equals(location)))
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
