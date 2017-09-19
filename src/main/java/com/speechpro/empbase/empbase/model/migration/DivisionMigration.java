package com.speechpro.empbase.empbase.model.migration;

import java.util.List;

public class DivisionMigration {
    private Long id;
    private String name;
    private String nameEng;
    private String email;
    private EmployeeMigration head;
    private String link;
    private List<DivisionMigration> children;

    public DivisionMigration() {
    }

    public DivisionMigration(Long id, String name, String nameEng, String email, EmployeeMigration head, String link, List<DivisionMigration> children) {
        this.id = id;
        this.name = name;
        this.nameEng = nameEng;
        this.email = email;
        this.head = head;
        this.link = link;
        this.children = children;
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EmployeeMigration getHead() {
        return head;
    }

    public void setHead(EmployeeMigration head) {
        this.head = head;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public List<DivisionMigration> getChildren() {
        return children;
    }

    public void setChildren(List<DivisionMigration> children) {
        this.children = children;
    }
}
