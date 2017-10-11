package com.speechpro.empbase.empbase.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Skill {

    public Skill() {
    }

    public Skill(String name, SkillGroup skillGroup, Set<Employee> employees) {
        this.name = name;
        this.skillGroup = skillGroup;
        this.employees = employees;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 128)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "skillGroupId")
    @Fetch(FetchMode.JOIN)
    private SkillGroup skillGroup;

    @ManyToMany
    @JoinTable(name = "employeeSkills",
            joinColumns = @JoinColumn(name = "skillId", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "employeeId", referencedColumnName = "id"))
    private Set<Employee> employees;

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

    public SkillGroup getSkillGroup() {
        return skillGroup;
    }

    public void setSkillGroup(SkillGroup skillGroup) {
        this.skillGroup = skillGroup;
    }

    @JsonIgnore
    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }
}
