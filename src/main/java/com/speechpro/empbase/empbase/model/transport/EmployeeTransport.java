package com.speechpro.empbase.empbase.model.transport;

import com.speechpro.empbase.empbase.model.entities.Employee;
import com.speechpro.empbase.empbase.model.entities.Location;
import com.speechpro.empbase.empbase.model.entities.Organization;
import com.speechpro.empbase.empbase.model.entities.Position;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class EmployeeTransport {

    public EmployeeTransport(Employee employee) {
        this.id = employee.getId();
        this.position = employee.getPosition();
        this.divisionId = employee.getDivision() == null ? null : employee.getDivision().getId();
        this.fio = employee.getFio();
        this.fioEng = employee.getFioEng();
        this.uname = employee.getUname();
        this.onesId = employee.getOnesId();
        this.birthDate = employee.getBirthDate();
        this.created = employee.getCreated();
        this.updated = employee.getUpdated();
        this.updatedBy = employee.getUpdatedBy();
        this.location = employee.getLocation();
        this.organization = employee.getOrganization();
        this.active = employee.isActive();
    }

    private Long id;
    private Position position;
    private Long divisionId;
    private String fio;
    private String fioEng;
    private String uname;
    private String onesId;
    private Date birthDate;
    private Date created;
    private Date updated;
    private Employee updatedBy;
    private Location location;
    private Organization organization;
    private boolean active;

    public Employee toEmployee(){
        Employee e = new Employee();
        e.setId(this.getId());
        e.setPosition(this.position);
        e.setFio(this.fio);
        e.setFioEng(this.fioEng);
        e.setUname(this.uname);
        e.setOnesId(this.onesId);
        e.setBirthDate(this.birthDate);
        e.setCreated(this.created);
        e.setUpdated(this.updated);
        e.setUpdatedBy(this.updatedBy);
        e.setLocation(this.location);
        e.setOrganization(this.organization);
        e.setActive(this.active);
        return e;
    }
}
