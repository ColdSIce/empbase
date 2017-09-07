package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
}
