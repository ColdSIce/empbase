package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long>{
}
