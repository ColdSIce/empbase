package com.speechpro.empbase.empbase.model.migration;

public class EmployeeRoleMigration {
    private Long id;
    private String text;

    public EmployeeRoleMigration() {
    }

    public EmployeeRoleMigration(Long id, String text) {
        this.id = id;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
