package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RoleService {
    Role getById(Long id);
    Role save(Role role);
    Role update(Role role);
    void delete(Role role);
    List<Role> getAll();
}
