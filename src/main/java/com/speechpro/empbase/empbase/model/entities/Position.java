package com.speechpro.empbase.empbase.model.entities;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
public class Position {

    public Position() {
    }

    public Position(String position, String positionEng, Position old) {
        this.position = position;
        this.positionEng = positionEng;
        this.old = old;
    }

    @Id
    @GeneratedValue
    private Long id;

    @Column(length = 128)
    private String position;

    @Column(length = 128)
    private String positionEng;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "oldId")
    @Fetch(FetchMode.JOIN)
    private Position old;

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

    public Position getOld() {
        return old;
    }

    public void setOld(Position old) {
        this.old = old;
    }
}
