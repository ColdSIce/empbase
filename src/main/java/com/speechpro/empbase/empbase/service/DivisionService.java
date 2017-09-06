package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Division;
import com.speechpro.empbase.empbase.model.entities.Employee;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface DivisionService {
    Division getById(Long id);
    List<Division> getAll();
    List<Division> getAllByParent(Division division);
    List<Employee> getEmployeesByDivision(Division division);
    List<Employee> getEmployeesByDivisionRecursively(Division division);
    Employee getFirstHead(Division division);
    List<Employee> getAllHeads(Division division);

    Division create(Division division);
    Division update(Division division);
    void delete(Division division);
}
