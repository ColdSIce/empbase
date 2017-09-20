package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.Location;
import com.speechpro.empbase.empbase.model.entities.Office;
import com.speechpro.empbase.empbase.repository.LocationRepository;
import com.speechpro.empbase.empbase.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LocationServiceImpl implements LocationService{

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Location> getAll() {
        return locationRepository.findAll();
    }

    @Override
    public Location getById(Long id) {
        return locationRepository.findOne(id);
    }

    @Override
    public Location create(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public Location update(Location location) {
        return locationRepository.save(location);
    }

    @Override
    public void delete(Location location) {
        locationRepository.delete(location);
    }

    @Override
    public List<Location> getByOffice(Office office) {
        return locationRepository.findByOffice(office);
    }

    @Override
    public Location getByName(String location) {
        return locationRepository.findOneByName(location);
    }
}
