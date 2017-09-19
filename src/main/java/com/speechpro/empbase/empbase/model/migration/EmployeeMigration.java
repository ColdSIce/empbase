package com.speechpro.empbase.empbase.model.migration;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.speechpro.empbase.empbase.model.entities.Employee;

import java.util.Date;
import java.util.List;

public class EmployeeMigration {
    private Long id;
    private String fio;
    private String fioEng;
    private String uname;
    private Date birthDate;
    private boolean isActive;
    private PositionMigration position;
    private LocationMigration location;
    private String organization;
    private Long imgId;
    private Long imgBig;
    private Long imgSmId;
    private List<ContactMigration> _contacts;
    private Date created;
    private List<SkillMigration> skills;
    private String searchString;
    private String onesId;
    private DivisionMigration division;

    public EmployeeMigration() {
    }

    public EmployeeMigration(Long id, String fio, String fioEng, String uname, Date birthDate, boolean isActive, PositionMigration position, LocationMigration location, String organization, Long imgId, Long imgBig, Long imgSmId, List<ContactMigration> _contacts, Date created, List<SkillMigration> skills, String searchString, String onesId, DivisionMigration division) {
        this.id = id;
        this.fio = fio;
        this.fioEng = fioEng;
        this.uname = uname;
        this.birthDate = birthDate;
        this.isActive = isActive;
        this.position = position;
        this.location = location;
        this.organization = organization;
        this.imgId = imgId;
        this.imgBig = imgBig;
        this.imgSmId = imgSmId;
        this._contacts = _contacts;
        this.created = created;
        this.skills = skills;
        this.searchString = searchString;
        this.onesId = onesId;
        this.division = division;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    @JsonProperty("isActive")
    public boolean isActive() {
        return isActive;
    }

    @JsonProperty("isActive")
    public void setActive(boolean active) {
        isActive = active;
    }

    public PositionMigration getPosition() {
        return position;
    }

    public void setPosition(PositionMigration position) {
        this.position = position;
    }

    public LocationMigration getLocation() {
        return location;
    }

    public void setLocation(LocationMigration location) {
        this.location = location;
    }

    public String getOrganization() {
        return organization;
    }

    public void setOrganization(String organization) {
        this.organization = organization;
    }

    public Long getImgId() {
        return imgId;
    }

    public void setImgId(Long imgId) {
        this.imgId = imgId;
    }

    public Long getImgBig() {
        return imgBig;
    }

    public void setImgBig(Long imgBigId) {
        this.imgBig = imgBigId;
    }

    public Long getImgSmId() {
        return imgSmId;
    }

    public void setImgSmId(Long imgSmId) {
        this.imgSmId = imgSmId;
    }

    public List<ContactMigration> get_contacts() {
        return _contacts;
    }

    public void set_contacts(List<ContactMigration> _contacts) {
        this._contacts = _contacts;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public List<SkillMigration> getSkills() {
        return skills;
    }

    public void setSkills(List<SkillMigration> skills) {
        this.skills = skills;
    }

    public String getSearchString() {
        return searchString;
    }

    public void setSearchString(String searchString) {
        this.searchString = searchString;
    }

    public String getOnesId() {
        return onesId;
    }

    public void setOnesId(String onesId) {
        this.onesId = onesId;
    }

    public DivisionMigration getDivision() {
        return division;
    }

    public void setDivision(DivisionMigration division) {
        this.division = division;
    }
}
