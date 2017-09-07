package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Office;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfficeRepository extends JpaRepository<Office, Long>{
    List<Office> findByHead(Employee employee);
}
