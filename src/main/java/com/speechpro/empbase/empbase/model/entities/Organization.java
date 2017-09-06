package com.speechpro.empbase.empbase.model.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Organization {

    public Organization() {
    }

    public Organization(String name, String nameEng) {
        this.name = name;
        this.nameEng = nameEng;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 128)
    private String name;

    @Column(length = 128)
    private String nameEng;

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

    public String getNameEng() {
        return nameEng;
    }

    public void setNameEng(String nameEng) {
        this.nameEng = nameEng;
    }
}
