package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Permission;
import com.speechpro.empbase.empbase.model.entities.Role;
import com.speechpro.empbase.empbase.repository.PermissionRepository;
import com.speechpro.empbase.empbase.repository.RoleRepository;
import com.speechpro.empbase.empbase.service.PermissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PermissionServiceImpl implements PermissionService{

    @Autowired
    private PermissionRepository permissionRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Permission getById(Long id) {
        return permissionRepository.findOne(id);
    }

    @Override
    public Permission save(Permission permission) {
        return permissionRepository.save(permission);
    }

    @Override
    public Permission update(Permission permission) {
        return permissionRepository.save(permission);
    }

    @Override
    public void delete(Permission permission) {
        permission.getRoles().forEach(r -> {
            r.getPermissions().remove(permission);
            roleRepository.save(r);
        });
        permissionRepository.delete(permission);
    }
}
