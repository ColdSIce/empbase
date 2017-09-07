package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.SkillGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillGroupRepository extends JpaRepository<SkillGroup, Long>{
}
