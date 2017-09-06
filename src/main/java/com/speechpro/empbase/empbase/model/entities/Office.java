package com.speechpro.empbase.empbase.model.entities;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
public class Office {

    public Office() {
    }

    public Office(String name, String nameEng, String shortName, Employee head) {
        this.name = name;
        this.nameEng = nameEng;
        this.shortName = shortName;
        this.head = head;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 128)
    private String name;

    @Column(length = 128)
    private String nameEng;

    @Column(length = 45)
    private String shortName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "headId")
    @Fetch(FetchMode.JOIN)
    private Employee head;

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

    public String getShortName() {
        return shortName;
    }

    public void setShortName(String shortName) {
        this.shortName = shortName;
    }

    public Employee getHead() {
        return head;
    }

    public void setHead(Employee head) {
        this.head = head;
    }
}
