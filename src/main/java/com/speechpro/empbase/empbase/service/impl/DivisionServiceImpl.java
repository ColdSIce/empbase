package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Division;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.repository.DivisionRepository;
import com.speechpro.empbase.empbase.service.DivisionService;
import com.speechpro.empbase.empbase.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DivisionServiceImpl implements DivisionService {

    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private DivisionRepository divisionRepository;

    @Override
    public Division getById(Long id) {
        return divisionRepository.findOne(id);
    }

    @Override
    public List<Division> getAll() {
        return divisionRepository.findAll();
    }

    @Override
    public List<Division> getAllByParent(Division division) {
        return divisionRepository.findByRootDivision(division);
    }

    @Override
    public List<Employee> getEmployeesByDivision(Division division) {
        return employeeService.getByDivision(division);
    }

    @Override
    public List<Employee> getEmployeesByDivisionRecursively(Division division) {
        return getEmployeeRecur(division);
    }

    private List<Employee> getEmployeeRecur(Division division){
        List<Employee> employees = employeeService.getByDivision(division);
        getAllByParent(division).forEach(d -> employees.addAll(getEmployeeRecur(d)));
        return employees;
    }

    @Override
    public Employee getFirstHead(Division division) {
        return null;
    }

    @Override
    public List<Employee> getAllHeads(Division division) {
        return null;
    }

    @Override
    public Division create(Division division) {
        return null;
    }

    @Override
    public Division update(Division division) {
        return null;
    }

    @Override
    public void delete(Division division) {

    }
}
