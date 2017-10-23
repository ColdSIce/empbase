package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Location;
import com.speechpro.empbase.empbase.model.entities.Office;
import com.speechpro.empbase.empbase.service.EmployeeService;
import com.speechpro.empbase.empbase.service.LocationService;
import com.speechpro.empbase.empbase.service.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @Autowired
    private OfficeService officeService;
    
    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/location", method = RequestMethod.GET)
    List<Location> getLocation(){
        return locationService.getAll();
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.GET)
    Location getLocation(@PathVariable Long id){
        return locationService.getById(id);
    }

    @RequestMapping(value = "/location", method = RequestMethod.POST)
    Location createLocation(@RequestBody Location location){
        return locationService.create(location);
    }

    @RequestMapping(value = "/location", method = RequestMethod.PUT)
    Location updateLocation(@RequestBody Location location){
        return locationService.update(location);
    }

    @RequestMapping(value = "/location/{id}", method = RequestMethod.DELETE)
    @Transactional
    ResponseEntity<Location> deleteLocation(@PathVariable Long id){
        Location location = locationService.getById(id);
        if(location != null){
            employeeService.getByLocation(location).forEach(employee -> {
                employee.setLocation(null);
                employeeService.update(employee);
            });
            locationService.delete(location);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/office/{id}/location", method = RequestMethod.GET)
    ResponseEntity<List<Location>> getContactByEmployee(@PathVariable Long id){
        Office office = officeService.getById(id);
        if(office != null){
            return new ResponseEntity<>(locationService.getByOffice(office), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
