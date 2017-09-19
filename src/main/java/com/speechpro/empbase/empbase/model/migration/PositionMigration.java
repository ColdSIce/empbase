package com.speechpro.empbase.empbase.model.migration;

import com.speechpro.empbase.empbase.model.entities.Position;

public class PositionMigration{
    private Long id;
    private String position;
    private String position_eng;
    private Long oldId;

    public PositionMigration() {
    }

    public PositionMigration(Long id, String position, String position_eng, Long oldId) {
        this.id = id;
        this.position = position;
        this.position_eng = position_eng;
        this.oldId = oldId;
    }

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

    public String getPosition_eng() {
        return position_eng;
    }

    public void setPosition_eng(String position_eng) {
        this.position_eng = position_eng;
    }

    public Long getOldId() {
        return oldId;
    }

    public void setOldId(Long oldId) {
        this.oldId = oldId;
    }

    public Position toPosition(){
        Position position = new Position();
        position.setPosition(this.position);
        position.setPositionEng(this.position_eng);
        position.setOldId(this.oldId);
        return position;
    }
}
