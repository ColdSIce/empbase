package com.speechpro.empbase.empbase.model.migration;

import java.util.List;

public class RoleMigration {
    private Long id;
    private String description;
    private String name;
    private List<Long> permissions;
    private List<EmployeeRoleMigration> employees;

    public RoleMigration() {
    }

    public RoleMigration(Long id, String description, String name, List<Long> permissions, List<EmployeeRoleMigration> employees) {
        this.id = id;
        this.description = description;
        this.name = name;
        this.permissions = permissions;
        this.employees = employees;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Long> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Long> permissions) {
        this.permissions = permissions;
    }

    public List<EmployeeRoleMigration> getEmployees() {
        return employees;
    }

    public void setEmployees(List<EmployeeRoleMigration> employees) {
        this.employees = employees;
    }
}
