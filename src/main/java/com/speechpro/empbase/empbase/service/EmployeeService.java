package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface EmployeeService {

    List<Employee> getAll();
    List<Employee> getActive();
    Employee getById(Long id);
    Employee getByUname(String uname);
    Employee getByOnesId(String onesId);

    Employee create(Employee employee);

    Employee update(Employee employee);

    void delete(Employee employee);
    void delete(Long id);

    List<Employee> getByDivision(Division division);

    List<Employee> getByLocation(Location location);

    List<Employee> getByPosition(Position position);

    List<Employee> getByOrganization(Organization organization);
}
