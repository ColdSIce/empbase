package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Office;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface OfficeService {
    List<Office> getAll();
    Office getById(Long id);
    Office create(Office office);
    Office update(Office office);
    void delete(Office office);

    List<Office> getByHead(Employee employee);

    Office getByName(String officeName);
}
