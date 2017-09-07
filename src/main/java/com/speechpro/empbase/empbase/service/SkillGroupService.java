package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.SkillGroup;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface SkillGroupService {
    List<SkillGroup> getAll();
    SkillGroup getById(Long id);
    SkillGroup create(SkillGroup skillGroup);
    SkillGroup update(SkillGroup skillGroup);
    void delete(SkillGroup skillGroup);
}
