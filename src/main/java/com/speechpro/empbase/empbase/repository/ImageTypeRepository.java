package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.ImageType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ImageTypeRepository extends JpaRepository<ImageType, Long>{
}
