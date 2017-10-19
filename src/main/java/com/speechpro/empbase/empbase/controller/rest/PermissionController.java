package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Permission;
import com.speechpro.empbase.empbase.service.PermissionService;
import com.speechpro.empbase.empbase.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api")
public class PermissionController {

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private RoleService roleService;

    @RequestMapping(value = "/permission", method = RequestMethod.GET)
    List<Permission> getAllPermissions(){
        return permissionService.getAll();
    }

    @RequestMapping(value = "/permission/{id}", method = RequestMethod.GET)
    Permission getPermission(@PathVariable Long id){
        return permissionService.getById(id);
    }

    @RequestMapping(value = "/permission", method = RequestMethod.POST)
    Permission createPermission(@RequestBody Permission permission){
        return permissionService.save(permission);
    }

    @RequestMapping(value = "/permission", method = RequestMethod.PUT)
    Permission updatePermission(@RequestBody Permission permission){
        return permissionService.update(permission);
    }

    @RequestMapping(value = "/permission/{id}", method = RequestMethod.DELETE)
    @Transactional
    ResponseEntity<Permission> deletePermission(@PathVariable Long id){
        Permission permission = permissionService.getById(id);
        if(permission != null){
            permission.getRoles().forEach(r -> {
                r.getPermissions().remove(r);
                roleService.update(r);
            });
            permissionService.delete(permission);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
