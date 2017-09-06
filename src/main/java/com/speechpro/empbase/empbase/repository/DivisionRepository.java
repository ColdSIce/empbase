package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Division;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DivisionRepository extends JpaRepository<Division, Long> {
    List<Division> findByRootDivisionId(Long id);
}
