package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Permission;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PermissionService {
    Permission getById(Long id);
    Permission save(Permission permission);
    Permission update(Permission permission);
    void delete(Permission permission);

    List<Permission> getAll();
}
