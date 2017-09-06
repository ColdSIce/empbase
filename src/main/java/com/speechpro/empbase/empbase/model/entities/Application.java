package com.speechpro.empbase.empbase.model.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Application {

    public Application() {
    }

    public Application(String name, String description) {
        this.name = name;
        this.description = description;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 128)
    private String name;

    @Column(length = 128)
    private String description;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
