package com.speechpro.empbase.empbase.model.entities;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
public class Position {

    public Position() {
    }

    public Position(String position, String positionEng, Long oldId) {
        this.position = position;
        this.positionEng = positionEng;
        this.oldId = oldId;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 128)
    private String position;

    @Column(length = 128)
    private String positionEng;

    @Column
    private Long oldId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getPositionEng() {
        return positionEng;
    }

    public void setPositionEng(String positionEng) {
        this.positionEng = positionEng;
    }

    public Long getOldId() {
        return oldId;
    }

    public void setOldId(Long oldId) {
        this.oldId = oldId;
    }
}
