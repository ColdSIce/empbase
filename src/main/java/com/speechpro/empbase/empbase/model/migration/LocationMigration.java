package com.speechpro.empbase.empbase.model.migration;

import com.speechpro.empbase.empbase.model.entities.Location;

public class LocationMigration {
    private Long id;
    private String name;
    private Long officeId;

    public LocationMigration() {
    }

    public LocationMigration(Long id, String name, Long officeId) {
        this.id = id;
        this.name = name;
        this.officeId = officeId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getOfficeId() {
        return officeId;
    }

    public void setOfficeId(Long officeId) {
        this.officeId = officeId;
    }

}
