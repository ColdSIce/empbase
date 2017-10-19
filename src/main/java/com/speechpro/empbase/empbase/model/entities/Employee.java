package com.speechpro.empbase.empbase.model.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
public class Employee {

    public Employee(Position position,
                    Long divisionId,
                    Set<Skill> skills,
                    Set<Contact> contacts,
                    Long imageId,
                    String fio,
                    String fioEng,
                    String gender,
                    String uname,
                    String onesId,
                    Date birthDate,
                    Date created,
                    Date updated,
                    Long updatedBy,
                    Location location,
                    Organization organization,
                    boolean active) {
        this.position = position;
        this.divisionId = divisionId;
        this.skills = skills;
        this.contacts = contacts;
        this.imageId = imageId;
        this.fio = fio;
        this.fioEng = fioEng;
        this.gender = gender;
        this.uname = uname;
        this.onesId = onesId;
        this.birthDate = birthDate;
        this.created = created;
        this.updated = updated;
        this.updatedBy = updatedBy;
        this.location = location;
        this.organization = organization;
        this.active = active;
    }

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "positionId")
    @Fetch(FetchMode.JOIN)
    private Position position;

    @Column
    private Long divisionId;

    @ManyToMany(mappedBy = "employees")
    private Set<Skill> skills;

    @ManyToMany(mappedBy = "employees")
    private Set<Role> roles;

    @Column
    private Long imageId;

    @OneToMany(mappedBy="employee")
    @OrderBy("contactType")
    private Set<Contact> contacts;

    @Column(length = 128)
    private String fio;

    @Column(length = 128)
    private String gender;

    @Column(length = 128, name = "fioEng")
    private String fioEng;

    @Column(length = 128)
    private String uname;

    @Column(length = 128, name = "onesId")
    private String onesId;

    @Column(name = "birthDate")
    private Date birthDate;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date created;

    @Column
    @Temporal(TemporalType.TIMESTAMP)
    private Date updated;

    @Column
    private Long updatedBy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "locationId")
    @Fetch(FetchMode.JOIN)
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "organizationId")
    @Fetch(FetchMode.JOIN)
    private Organization organization;

    @Column(name = "isActive")
    private boolean active;

    public Employee() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public Long getDivisionId() {
        return divisionId;
    }

    public void setDivisionId(Long divisionId) {
        this.divisionId = divisionId;
    }

    public Set<Skill> getSkills() {
        return skills;
    }

    public void setSkills(Set<Skill> skills) {
        this.skills = skills;
    }

    public Long getImageId() {
        return imageId;
    }

    public void setImageId(Long imageId) {
        this.imageId = imageId;
    }

    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = fio;
    }

    public String getFioEng() {
        return fioEng;
    }

    public void setFioEng(String fioEng) {
        this.fioEng = fioEng;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getOnesId() {
        return onesId;
    }

    public void setOnesId(String onesId) {
        this.onesId = onesId;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }

    public Long getUpdatedBy() {
        return updatedBy;
    }

    public void setUpdatedBy(Long updatedBy) {
        this.updatedBy = updatedBy;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Organization getOrganization() {
        return organization;
    }

    public void setOrganization(Organization organization) {
        this.organization = organization;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public Set<Contact> getContacts() {
        return contacts;
    }

    public void setContacts(Set<Contact> contacts) {
        this.contacts = contacts;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @JsonIgnore
    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
}
