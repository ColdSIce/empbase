package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Division;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.transport.EmployeeTransport;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {

    List<Employee> getAll();
    Employee getById(Long id);
    Employee getByUname(String uname);
    Employee getByOnesId(String onesId);

    Employee create(Employee employee);
    EmployeeTransport create(EmployeeTransport employeeTransport);

    Employee update(Employee employee);
    EmployeeTransport update(EmployeeTransport employeeTransport);

    void delete(Employee employee);
    void delete(Long id);

    List<Employee> getByDivision(Division division);

}
