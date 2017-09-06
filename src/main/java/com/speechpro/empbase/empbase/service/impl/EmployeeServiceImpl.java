package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Division;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.transport.EmployeeTransport;
import com.speechpro.empbase.empbase.repository.EmployeeRepository;
import com.speechpro.empbase.empbase.service.DivisionService;
import com.speechpro.empbase.empbase.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DivisionService divisionService;

    @Override
    public List<Employee> getAll() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee getById(Long id) {
        return employeeRepository.findOne(id);
    }

    @Override
    public Employee getByUname(String uname) {
        return employeeRepository.findOneByUname(uname);
    }

    @Override
    public Employee getByOnesId(String onesId) {
        return employeeRepository.findOneByOnesId(onesId);
    }

    @Override
    public Employee create(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public EmployeeTransport create(EmployeeTransport employeeTransport) {
        Employee employee = employeeTransport.toEmployee();
        if(employeeTransport.getDivisionId() != null && employeeTransport.getDivisionId() != 0){
            Division division = divisionService.getById(employeeTransport.getDivisionId());
            if(division != null) employee.setDivision(division);
        }
        return employeeRepository.save(employee).toTransport();
    }

    @Override
    public Employee update(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public EmployeeTransport update(EmployeeTransport employeeTransport) {
        Employee employee = employeeTransport.toEmployee();
        if(employeeTransport.getDivisionId() != null && employeeTransport.getDivisionId() != 0){
            Division division = divisionService.getById(employeeTransport.getDivisionId());
            if(division != null) employee.setDivision(division);
        }
        return employeeRepository.save(employee).toTransport();
    }

    @Override
    public void delete(Employee employee) {
        employeeRepository.delete(employee);
    }

    @Override
    public void delete(Long id) {
        employeeRepository.delete(id);
    }

    @Override
    public List<Employee> getByDivision(Division division) {
        return employeeRepository.findByDivision(division);
    }
}
