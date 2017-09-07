package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Contact;
import com.speechpro.empbase.empbase.model.entities.ContactType;
import com.speechpro.empbase.empbase.model.entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Long>{
    List<Contact> findByEmployee(Employee employee);
}
