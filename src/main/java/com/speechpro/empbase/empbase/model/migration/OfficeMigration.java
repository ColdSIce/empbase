package com.speechpro.empbase.empbase.model.migration;

import com.speechpro.empbase.empbase.model.entities.Office;

import java.util.List;

public class OfficeMigration {
    private Long id;
    private String name;
    private List<LocationMigration> children;

    public OfficeMigration() {
    }

    public OfficeMigration(Long id, String name, List<LocationMigration> children) {
        this.id = id;
        this.name = name;
        this.children = children;
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

    public List<LocationMigration> getChildren() {
        return children;
    }

    public void setChildren(List<LocationMigration> children) {
        this.children = children;
    }

    public Office toOffice(){
        Office o = new Office();
        o.setName(this.name);
        return o;
    }
}
