package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Application;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ApplicationService {
    List<Application> getAll();
    Application getById(Long id);
    Application create(Application application);
    Application update(Application application);
    void delete(Application application);
}
