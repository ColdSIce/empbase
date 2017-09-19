package com.speechpro.empbase.empbase.model.migration;

public class ContactMigration {
    private Long contactId;
    private String contactValue;
    private Long contactTypeId;
    private String contactType;

    public ContactMigration() {
    }

    public ContactMigration(Long contactId, String contactValue, Long contactTypeId, String contactType) {
        this.contactId = contactId;
        this.contactValue = contactValue;
        this.contactTypeId = contactTypeId;
        this.contactType = contactType;
    }

    public Long getContactId() {
        return contactId;
    }

    public void setContactId(Long contactId) {
        this.contactId = contactId;
    }

    public String getContactValue() {
        return contactValue;
    }

    public void setContactValue(String contactValue) {
        this.contactValue = contactValue;
    }

    public Long getContactTypeId() {
        return contactTypeId;
    }

    public void setContactTypeId(Long contactTypeId) {
        this.contactTypeId = contactTypeId;
    }

    public String getContactType() {
        return contactType;
    }

    public void setContactType(String contactType) {
        this.contactType = contactType;
    }
}
