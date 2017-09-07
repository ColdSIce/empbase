package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Deputy;
import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.repository.DeputyRepository;
import com.speechpro.empbase.empbase.service.DeputyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DeputyServiceImpl implements DeputyService{

    @Autowired
    private DeputyRepository deputyRepository;

    @Override
    public List<Deputy> getAll() {
        return deputyRepository.findAll();
    }

    @Override
    public Deputy getById(Long id) {
        return deputyRepository.findOne(id);
    }

    @Override
    public Deputy create(Deputy deputy) {
        return deputyRepository.save(deputy);
    }

    @Override
    public Deputy update(Deputy deputy) {
        return deputyRepository.save(deputy);
    }

    @Override
    public void delete(Deputy deputy) {
        deputyRepository.delete(deputy);
    }

    @Override
    public List<Deputy> getByHead(Employee employee) {
        return deputyRepository.findByHead(employee);
    }

    @Override
    public List<Deputy> getByDeputy(Employee employee) {
        return deputyRepository.findByDeputy(employee);
    }
}
