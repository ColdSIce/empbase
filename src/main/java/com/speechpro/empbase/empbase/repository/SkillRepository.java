package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Skill;
import com.speechpro.empbase.empbase.model.entities.SkillGroup;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long>{
    List<Skill> findBySkillGroup(SkillGroup skillGroup);
}
