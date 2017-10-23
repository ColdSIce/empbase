package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Role;
import com.speechpro.empbase.empbase.service.EmployeeService;
import com.speechpro.empbase.empbase.service.PermissionService;
import com.speechpro.empbase.empbase.service.RoleService;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private EmployeeService employeeService;

    @RequestMapping(value = "/role/all", method = RequestMethod.GET)
    List<Role> getAllRoles(){
        return roleService.getAll();
    }

    @RequestMapping(value = "/role/{id}", method = RequestMethod.GET)
    Role getRole(@PathVariable Long id){
        return roleService.getById(id);
    }

    @RequestMapping(value = "/role", method = RequestMethod.POST)
    Role createRole(@RequestBody Role role){
        return roleService.save(role);
    }

    @RequestMapping(value = "/role", method = RequestMethod.PUT)
    Role updateRole(@RequestBody Role role){
        Role saved = roleService.getById(role.getId());
        saved.getPermissions().forEach(p -> {
            if(role.getPermissions().stream().noneMatch(perm -> Objects.equals(perm.getId(), p.getId()))) {
                p.getRoles().remove(saved);
                permissionService.update(p);
            }
        });
        saved.getEmployees().forEach(e -> {
            if(role.getEmployees().stream().noneMatch(empl -> Objects.equals(empl.getId(), e.getId()))) {
                e.getRoles().remove(saved);
                employeeService.update(e);
            }
        });
        return roleService.update(role);
    }

    @RequestMapping(value = "/role/{id}", method = RequestMethod.DELETE)
    @Transactional
    ResponseEntity<Role> deleteRole(@PathVariable Long id){
        Role role = roleService.getById(id);
        if(role != null){
            role.getPermissions().forEach(p -> {
                p.getRoles().remove(role);
                permissionService.update(p);
            });
            role.getEmployees().forEach(e -> {
                e.getRoles().remove(role);
                employeeService.update(e);
            });
            roleService.delete(role);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/role/{id}/employee", method = RequestMethod.GET)
    Set<Employee> getEmployeesByRole(@PathVariable Long id) throws NotFoundException {
        Role role = roleService.getById(id);
        if(role != null){
            return role.getEmployees();
        } else {
            throw new NotFoundException("Can't found role with id: " + id);
        }
    }

    @RequestMapping(value = "/employee/{id}/role", method = RequestMethod.GET)
    Set<Role> getRolesByEmployee(@PathVariable Long id) throws NotFoundException {
        Employee employee = employeeService.getById(id);
        if(employee != null){
            return employee.getRoles();
        } else {
            throw new NotFoundException("Can't found employee with id: " + id);
        }
    }
}
