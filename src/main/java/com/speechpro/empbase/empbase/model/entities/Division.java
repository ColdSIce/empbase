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
                    Long rootDivisionId,
                    Long oldId,
                    Employee head) {
        this.name = name;
        this.nameEng = nameEng;
        this.link = link;
        this.email = email;
        this.rootDivisionId = rootDivisionId;
        this.oldId = oldId;
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

    @Column
    private Long rootDivisionId;

    @Column
    private Long oldId;

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

    public Long getRootDivisionId() {
        return rootDivisionId;
    }

    public void setRootDivisionId(Long rootDivisionId) {
        this.rootDivisionId = rootDivisionId;
    }

    public Long getOldId() {
        return oldId;
    }

    public void setOldId(Long oldId) {
        this.oldId = oldId;
    }

    public Employee getHead() {
        return head;
    }

    public void setHead(Employee head) {
        this.head = head;
    }
}
