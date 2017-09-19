package com.speechpro.empbase.empbase.model.migration;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.speechpro.empbase.empbase.model.entities.Skill;
import com.speechpro.empbase.empbase.model.entities.SkillGroup;

public class SkillMigration {
    private Long id;
    private Long groupId;
    private String name;
    private String displayName;
    private String group;
    private boolean isGroup;

    public SkillMigration() {
    }

    public SkillMigration(Long id, Long groupId, String name, String displayName, String group, boolean isGroup) {
        this.id = id;
        this.groupId = groupId;
        this.name = name;
        this.displayName = displayName;
        this.group = group;
        this.isGroup = isGroup;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getGroupId() {
        return groupId;
    }

    public void setGroupId(Long groupId) {
        this.groupId = groupId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    @JsonProperty("group")
    public String getGroup() {
        return group;
    }

    @JsonProperty("group")
    public void setGroup(String group) {
        this.group = group;
    }

    @JsonProperty("isGroup")
    public boolean isGroup() {
        return isGroup;
    }

    @JsonProperty("isGroup")
    public void setGroup(boolean group) {
        isGroup = group;
    }

    public SkillGroup toSkillGroup(){
        SkillGroup sg = new SkillGroup();
        sg.setName(this.group);
        return sg;
    }
}
