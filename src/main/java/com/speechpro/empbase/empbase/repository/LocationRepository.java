package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Location;
import com.speechpro.empbase.empbase.model.entities.Office;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long>{
    List<Location> findByOffice(Office office);

    Location findOneByName(String location);
}
