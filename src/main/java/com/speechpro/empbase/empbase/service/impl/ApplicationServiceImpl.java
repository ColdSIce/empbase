package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Application;
import com.speechpro.empbase.empbase.repository.ApplicationRepository;
import com.speechpro.empbase.empbase.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ApplicationServiceImpl implements ApplicationService{
    @Autowired
    private ApplicationRepository applicationRepository;

    @Override
    public List<Application> getAll() {
        return applicationRepository.findAll();
    }

    @Override
    public Application getById(Long id) {
        return applicationRepository.findOne(id);
    }

    @Override
    public Application create(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    public Application update(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    public void delete(Application application) {
        applicationRepository.delete(application);
    }
}

