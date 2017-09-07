package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Skill;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SkillService {
    List<Skill> getAll();
    Skill getById(Long id);
    Skill create(Skill skill);
    Skill update(Skill skill);
    void delete(Skill skill);
}
