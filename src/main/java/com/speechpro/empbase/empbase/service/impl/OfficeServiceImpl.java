package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Office;
import com.speechpro.empbase.empbase.repository.OfficeRepository;
import com.speechpro.empbase.empbase.service.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class OfficeServiceImpl implements OfficeService{

    @Autowired
    private OfficeRepository officeRepository;

    @Override
    public List<Office> getAll() {
        return officeRepository.findAll();
    }

    @Override
    public Office getById(Long id) {
        return officeRepository.findOne(id);
    }

    @Override
    public Office create(Office office) {
        return officeRepository.save(office);
    }

    @Override
    public Office update(Office office) {
        return officeRepository.save(office);
    }

    @Override
    public void delete(Office office) {
        officeRepository.delete(office);
    }

    @Override
    public List<Office> getByHead(Employee employee) {
        return officeRepository.findByHead(employee);
    }

    @Override
    public Office getByName(String officeName) {
        return officeRepository.findOneByName(officeName);
    }
}
