package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.SkillGroup;
import com.speechpro.empbase.empbase.repository.SkillGroupRepository;
import com.speechpro.empbase.empbase.service.SkillGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SkillGroupServiceimpl implements SkillGroupService{

    @Autowired
    private SkillGroupRepository skillGroupRepository;

    @Override
    public List<SkillGroup> getAll() {
        return skillGroupRepository.findAll();
    }

    @Override
    public SkillGroup getById(Long id) {
        return skillGroupRepository.findOne(id);
    }

    @Override
    public SkillGroup create(SkillGroup skillGroup) {
        return skillGroupRepository.save(skillGroup);
    }

    @Override
    public SkillGroup update(SkillGroup skillGroup) {
        return skillGroupRepository.save(skillGroup);
    }

    @Override
    public void delete(SkillGroup skillGroup) {
        skillGroupRepository.delete(skillGroup);
    }
}
