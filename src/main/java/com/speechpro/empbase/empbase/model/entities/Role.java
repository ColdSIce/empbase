package com.speechpro.empbase.empbase.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Role {

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 128)
    private String name;

    @ManyToMany(mappedBy = "roles")
    private Set<Permission> permissions;

    @ManyToMany
    @JoinTable(name = "employeeRoles",
            joinColumns = @JoinColumn(name = "roleId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "employeeId", referencedColumnName = "id"))
    private Set<Employee> employees;

    public Role() {
    }

    public Role(Long id, String name, Set<Permission> permissions, Set<Employee> employees) {
        this.id = id;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }

    public Set<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(Set<Permission> permissions) {
        this.permissions = permissions;
    }
}
