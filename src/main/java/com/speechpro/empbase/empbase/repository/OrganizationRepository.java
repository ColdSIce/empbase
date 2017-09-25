package com.speechpro.empbase.empbase.repository;

import com.speechpro.empbase.empbase.model.entities.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepository extends JpaRepository<Organization, Long>{
    Organization findOneByName(String orgName);
}
