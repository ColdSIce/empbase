package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Deputy;
import com.speechpro.empbase.empbase.model.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeputyRepository extends JpaRepository<Deputy, Long>{
    List<Deputy> findByHead(Employee employee);
    List<Deputy> findByDeputy(Employee employee);
}
