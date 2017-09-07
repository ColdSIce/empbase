package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Skill;
import com.speechpro.empbase.empbase.repository.SkillRepository;
import com.speechpro.empbase.empbase.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SkillServiceImpl implements SkillService{

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public List<Skill> getAll() {
        return skillRepository.findAll();
    }

    @Override
    public Skill getById(Long id) {
        return skillRepository.findOne(id);
    }

    @Override
    public Skill create(Skill skill) {
        return skillRepository.save(skill);
    }

    @Override
    public Skill update(Skill skill) {
        return skillRepository.save(skill);
    }

    @Override
    public void delete(Skill skill) {
        skillRepository.delete(skill);
    }
}
