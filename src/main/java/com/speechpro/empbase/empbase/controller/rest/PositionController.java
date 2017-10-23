package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Position;
import com.speechpro.empbase.empbase.service.EmployeeService;
import com.speechpro.empbase.empbase.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PositionController {

    @Autowired
    private PositionService positionService;

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/position/all", method = RequestMethod.GET)
    List<Position> getAll(){
        return positionService.getAll();
    }

    @RequestMapping(value = "/position/{id}", method = RequestMethod.GET)
    Position getPosition(@PathVariable Long id){
        return positionService.getById(id);
    }

    @RequestMapping(value = "/position", method = RequestMethod.POST)
    Position createPosition(@RequestBody Position position){
        return positionService.create(position);
    }

    @RequestMapping(value = "/position", method = RequestMethod.PUT)
    Position updatePosition(@RequestBody Position position){
        return positionService.update(position);
    }

    @RequestMapping(value = "/position/{id}", method = RequestMethod.DELETE)
    @Transactional
    ResponseEntity<Position> deletePosition(@PathVariable Long id){
        Position position = positionService.getById(id);
        if(position != null){
            employeeService.getByPosition(position).forEach(e -> {
                e.setPosition(null);
                employeeService.update(e);
            });
            positionService.delete(position);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
