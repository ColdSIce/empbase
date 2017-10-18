package com.speechpro.empbase.empbase.model.migration;

public class PermissionMigration {
    private Long id;
    private String name;
    private Long applicationId;

    public PermissionMigration() {
    }

    public PermissionMigration(Long id, String name, Long applicationId) {
        this.id = id;
        this.name = name;
        this.applicationId = applicationId;
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

    public Long getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Long applicationId) {
        this.applicationId = applicationId;
    }
}
