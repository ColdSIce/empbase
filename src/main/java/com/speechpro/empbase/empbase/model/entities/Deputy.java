package com.speechpro.empbase.empbase.model.entities;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
public class Deputy {

    public Deputy() {
    }

    public Deputy(Employee head, Employee deputy) {
        this.head = head;
        this.deputy = deputy;
    }

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "headId")
    @Fetch(FetchMode.JOIN)
    private Employee head;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deputyId")
    @Fetch(FetchMode.JOIN)
    private Employee deputy;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Employee getHead() {
        return head;
    }

    public void setHead(Employee head) {
        this.head = head;
    }

    public Employee getDeputy() {
        return deputy;
    }

    public void setDeputy(Employee deputy) {
        this.deputy = deputy;
    }
}
