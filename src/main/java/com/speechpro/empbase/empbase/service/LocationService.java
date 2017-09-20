package com.speechpro.empbase.empbase.service;

import com.speechpro.empbase.empbase.model.entities.Location;
import com.speechpro.empbase.empbase.model.entities.Office;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LocationService {
    List<Location> getAll();
    Location getById(Long id);
    Location create(Location location);
    Location update(Location location);
    void delete(Location location);

    List<Location> getByOffice(Office office);

    Location getByName(String location);
}
