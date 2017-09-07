package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Deputy;
import com.speechpro.empbase.empbase.model.entities.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DeputyService {
    List<Deputy> getAll();
    Deputy getById(Long id);
    Deputy create(Deputy deputy);
    Deputy update(Deputy deputy);
    void delete(Deputy deputy);

    List<Deputy> getByHead(Employee employee);
    List<Deputy> getByDeputy(Employee employee);
}
