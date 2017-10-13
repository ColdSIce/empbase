package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Division;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    Employee findOneByOnesId(String onesId);
    Employee findOneByUname(String uname);
    List<Employee> findByDivisionId(Long id);
    List<Employee> findByActive(boolean active);
    List<Employee> findByLocation(Location location);
}
