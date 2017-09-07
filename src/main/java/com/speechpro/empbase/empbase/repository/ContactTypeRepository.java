package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.ContactType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactTypeRepository extends JpaRepository<ContactType, Long>{
}
