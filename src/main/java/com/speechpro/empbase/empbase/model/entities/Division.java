package com.speechpro.empbase.empbase.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
public class Division {

    public Division(String name,
                    String nameEng,
                    String link,
                    String email,
                    Division rootDivision,
                    Division old,
                    Employee head) {
        this.name = name;
        this.nameEng = nameEng;
        this.link = link;
        this.email = email;
        this.rootDivision = rootDivision;
        this.old = old;
        this.head = head;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 128)
    private String name;

    @Column(length = 128, name = "nameEng")
    private String nameEng;

    @Column(length = 128)
    private String link;

    @Column(length = 128)
    private String email;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "rootDivisionId")
    @Fetch(FetchMode.JOIN)
    private Division rootDivision;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oldId")
    @Fetch(FetchMode.JOIN)
    private Division old;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "headId")
    @Fetch(FetchMode.JOIN)
    private Employee head;

    public Division() {
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

    public String getNameEng() {
        return nameEng;
    }

    public void setNameEng(String nameEng) {
        this.nameEng = nameEng;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @JsonIgnore
    public Division getRootDivision() {
        return rootDivision;
    }

    public void setRootDivision(Division rootDivision) {
        this.rootDivision = rootDivision;
    }

    @JsonIgnore
    public Division getOld() {
        return old;
    }

    public void setOld(Division old) {
        this.old = old;
    }

    public Employee getHead() {
        return head;
    }

    public void setHead(Employee head) {
        this.head = head;
    }
}
