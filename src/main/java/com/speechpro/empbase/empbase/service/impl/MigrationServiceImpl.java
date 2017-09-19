package com.speechpro.empbase.empbase.service.impl;

import com.speechpro.empbase.empbase.model.entities.*;
import com.speechpro.empbase.empbase.model.migration.*;
import com.speechpro.empbase.empbase.repository.*;
import com.speechpro.empbase.empbase.service.MigrationService;
import javafx.geometry.Pos;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import javax.persistence.EntityManager;
import java.util.*;
import java.util.stream.Collectors;


@Component
public class MigrationServiceImpl implements MigrationService{

    @Autowired
    @Qualifier(value="migrationRestTemplate")
    private RestTemplate migrationRestTemplate;

    @Autowired
    private Environment environment;

    @Autowired
    private OrganizationRepository organizationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DivisionRepository divisionRepository;

    @Autowired
    private ContactTypeRepository contactTypeRepository;

    @Autowired
    private ContactRepository contactRepository;

    @Autowired
    private SkillGroupRepository skillGroupRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private ImageTypeRepository imageTypeRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private DeputyRepository deputyRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private OfficeRepository officeRepository;

    @Autowired
    private PositionRepository positionRepository;

    private static Logger logger = LoggerFactory.getLogger(MigrationServiceImpl.class);

    private static final Map<Long, Employee> empMapping = new HashMap<>();
    private static final Map<Long, Division> divMapping = new HashMap<>();
    private static final Map<Long, Long> empDivMapping = new HashMap<>();
    private static final Map<Long, ContactType> ctMapping = new HashMap<>();
    private static final Map<Long, Organization> orgMapping = new HashMap<>();
    private static final Map<String, Organization> orgMappingByName = new HashMap<>();
    private static final Map<Long, Position> posMapping = new HashMap<>();
    private static final Map<Long, Office> officesMapping = new HashMap<>();
    private static final Map<Long, Location> locaMapping = new HashMap<>();
    private static final Map<Long, SkillGroup> sgMapping = new HashMap<>();
    private static final Map<Long, Skill> skillMapping = new HashMap<>();
    private static final Map<Long, Contact> contactMapping = new HashMap<>();
    private static final Map<Long, Set<Contact>> contactSetMapping = new HashMap<>();

    @Override
    public void synchData() {
        synchOrganizations();
        synchApplications();
        synchPositions();
        synchContactTypes();
        synchOffices();
        synchSkillGroups();
        synchDivisionsAndEmployees();
        synchDeputies();
    }

    private void synchOrganizations(){
        String url = environment.getProperty("empbase.api.organizations");
        ResponseEntity<Organization[]> responseEntity = migrationRestTemplate.getForEntity(url, Organization[].class);
        if(responseEntity.getStatusCode().equals(HttpStatus.OK)){
            organizationRepository.deleteAll();
            Arrays.stream(responseEntity.getBody()).forEach(o -> {
                Long oldId = o.getId();
                o.setId(null);
                Organization saved = organizationRepository.save(o);
                orgMapping.put(oldId, saved);
                orgMappingByName.put(o.getName(), saved);
            });
        }
    }
    private void synchPositions(){
        String url = environment.getProperty("empbase.api.positions");
        ResponseEntity<PositionMigration[]> responseEntity = migrationRestTemplate.getForEntity(url, PositionMigration[].class);
        if(responseEntity.getStatusCode().equals(HttpStatus.OK)){
            positionRepository.deleteAll();
            Arrays.stream(responseEntity.getBody())
                    .forEach(p -> {
                        Long oldId = p.getId();
                        Position saved = positionRepository.save(p.toPosition());
                        posMapping.put(oldId, saved);
            });
        }
    }
    private void synchApplications(){
        applicationRepository.deleteAll();
        Application a = new Application();
        a.setName("empbase");
        a.setDescription("Список сотрудников");
        applicationRepository.save(a);
        Application a2 = new Application();
        a2.setName("worktime");
        a2.setDescription("Worktime");
        applicationRepository.save(a2);
        Application a3 = new Application();
        a3.setName("worktime2");
        a3.setDescription("The new worktime");
        applicationRepository.save(a3);
    }
    private void synchContactTypes(){
        String url = environment.getProperty("empbase.api.contactTypes");
        ResponseEntity<ContactType[]> responseEntity = migrationRestTemplate.getForEntity(url, ContactType[].class);
        if(responseEntity.getStatusCode().equals(HttpStatus.OK)){
            contactTypeRepository.deleteAll();
            Arrays.stream(responseEntity.getBody())
                    .forEach(ct -> {
                        Long oldId = ct.getId();
                        ct.setId(null);
                        ContactType saved = contactTypeRepository.save(ct);
                        ctMapping.put(oldId, saved);
                    });
        }
    }
    private void synchOffices(){
        String url = environment.getProperty("empbase.api.locations");
        ResponseEntity<OfficeMigration[]> responseEntity = migrationRestTemplate.getForEntity(url, OfficeMigration[].class);
        if(responseEntity.getStatusCode().equals(HttpStatus.OK)){

            locationRepository.deleteAll();
            officeRepository.deleteAll();

            Arrays.asList(responseEntity.getBody())
                    .forEach(o -> {
                        Long oldId = o.getId();
                        Office saved = officeRepository.save(o.toOffice());
                        officesMapping.put(oldId, saved);
                    });

            Arrays.stream(responseEntity.getBody()).forEach(om -> {
                om.getChildren().forEach(lm -> {
                    Long oldId = lm.getId();
                    Location l = new Location();
                    l.setName(lm.getName());
                    l.setOffice(officesMapping.get(lm.getOfficeId()));
                    Location saved = locationRepository.save(l);
                    locaMapping.put(oldId, saved);
                });
            });
        }
    }
    private void synchSkillGroups(){
        String url = environment.getProperty("empbase.api.skills");
        ResponseEntity<SkillMigration[]> responseEntity = migrationRestTemplate.getForEntity(url, SkillMigration[].class);
        if(responseEntity.getStatusCode().equals(HttpStatus.OK)){
            skillRepository.deleteAll();
            skillGroupRepository.deleteAll();

            Arrays.stream(responseEntity.getBody())
                    .filter(SkillMigration::isGroup)
                    .forEach(sm -> {
                        Long oldId = sm.getId();
                        SkillGroup saved = skillGroupRepository.save(sm.toSkillGroup());
                        sgMapping.put(oldId, saved);
                    });

            Arrays.stream(responseEntity.getBody())
                    .filter(s -> !s.isGroup())
                    .forEach(sm -> {
                        Long oldId = sm.getId();
                        Skill s = new Skill();
                        s.setName(sm.getName());
                        s.setSkillGroup(sgMapping.get(sm.getGroupId()));
                        Skill saved = skillRepository.save(s);
                        skillMapping.put(oldId, saved);
                    });
        }
    }
    private void synchDivisionsAndEmployees(){

        String urlDiv = environment.getProperty("empbase.api.divisions");
        String urlEmp = environment.getProperty("empbase.api.employees");
        String imgUrl = environment.getProperty("empbase.api.image");

        List<DivisionMigration> divisionMigrations = new ArrayList<>();
        List<EmployeeMigration> employeeMigrations = new ArrayList<>();

        ResponseEntity<DivisionMigration[]> responseEntity = migrationRestTemplate.getForEntity(urlDiv, DivisionMigration[].class);
        if(responseEntity.getStatusCode().equals(HttpStatus.OK)){
            divisionMigrations = Arrays.asList(responseEntity.getBody());
        }

        ResponseEntity<EmployeeMigration[]> eResponseEntity = migrationRestTemplate.getForEntity(urlEmp, EmployeeMigration[].class);
        if(eResponseEntity.getStatusCode().equals(HttpStatus.OK)){
            employeeMigrations = Arrays.asList(eResponseEntity.getBody());
        }

        employeeMigrations.forEach(em -> {
            Employee e = new Employee();
            e.setUname(em.getUname());
            e.setFio(em.getFio());
            e.setFioEng(em.getFioEng());
            e.setOnesId(em.getOnesId());
            e.setActive(em.isActive());
            if(em.getOrganization() != null)
                e.setOrganization(orgMappingByName.get(em.getOrganization()));
            if(em.getLocation() != null && em.getLocation().getId() != null)
                e.setLocation(locaMapping.get(em.getLocation().getId()));
            e.setUpdated(new Date());
            e.setCreated(new Date());
            e.setBirthDate(em.getBirthDate());
            if(em.getPosition() != null && em.getPosition().getId() != null)
                e.setPosition(posMapping.get(em.getPosition().getId()));
            if(em.getImgBig() != null) {
                ResponseEntity<byte[]> imgResponseEntity =
                        migrationRestTemplate.getForEntity(imgUrl + em.getImgBig(), byte[].class);
                if (imgResponseEntity.getStatusCode().equals(HttpStatus.OK)) {
                    Image image = new Image();
                    image.setBinImage(imgResponseEntity.getBody());
                    Image saved = imageRepository.save(image);
                    e.setImageId(saved.getId());
                }
            }
            Long oldId = em.getId();
            Employee saved = employeeRepository.save(e);
            empMapping.put(oldId, saved);
            if(em.getDivision() != null) empDivMapping.put(oldId, em.getDivision().getId());
        });

        employeeMigrations.forEach(em -> {
            em.get_contacts().forEach(cm -> {
                Contact c = new Contact();
                c.setEmployee(empMapping.get(em.getId()));
                c.setContactType(ctMapping.get(cm.getContactTypeId()));
                c.setValue(cm.getContactValue());
                Long oldId = cm.getContactId();
                Contact saved = contactRepository.save(c);
                contactMapping.put(oldId, saved);
                if(contactSetMapping.get(em.getId()) != null) contactSetMapping.get(em.getId()).add(c);
                else {
                    Set<Contact> tmp = new HashSet<>();
                    tmp.add(c);
                    contactSetMapping.put(em.getId(), tmp);
                }
            });
        });

        divisionMigrations.forEach(dm -> {
            Division d = new Division();
            d.setEmail(dm.getEmail());
            if(dm.getHead() != null && dm.getHead().getId() != null)
                d.setHead(empMapping.get(dm.getHead().getId()));
            d.setLink(dm.getLink());
            d.setName(dm.getName());
            d.setNameEng(dm.getNameEng());
            Long oldId = dm.getId();
            Division saved = divisionRepository.save(d);
            divMapping.put(oldId, saved);
            saveSubDivs(dm.getChildren(), saved.getId());
        });

        empMapping.forEach((key, value) -> {
            Long divId = empDivMapping.get(key);
            Division d = divMapping.get(divId);
            if(d != null && d.getId() != null)
                value.setDivisionId(d.getId());
            value.setContacts(contactSetMapping.get(key));
            employeeRepository.save(value);
        });
    }

    private void saveSubDivs(List<DivisionMigration> divisions, Long rootId){
        divisions.forEach(dm -> {
            Division d = new Division();
            d.setEmail(dm.getEmail());
            if(dm.getHead() != null && dm.getHead().getId() != null)
                d.setHead(empMapping.get(dm.getHead().getId()));
            d.setLink(dm.getLink());
            d.setName(dm.getName());
            d.setNameEng(dm.getNameEng());
            Long oldId = dm.getId();
            d.setRootDivisionId(rootId);
            Division saved = divisionRepository.save(d);
            divMapping.put(oldId, saved);
            saveSubDivs(dm.getChildren(), saved.getId());
        });
    }

    private void synchDeputies(){
        String url = environment.getProperty("empbase.api.deputyByHead");
        deputyRepository.deleteAll();
        empMapping.forEach((key, value) -> {
            if(value.getUname() != null) {
                try {
                    ResponseEntity<EmployeeMigration[]> responseEntity = migrationRestTemplate.getForEntity(url + value.getUname(), EmployeeMigration[].class);
                    if (responseEntity.getStatusCode().equals(HttpStatus.OK)) {
                        Arrays.stream(responseEntity.getBody())
                                .forEach(e -> {
                                    Deputy deputy = new Deputy();
                                    deputy.setHead(value);
                                    Employee dep = empMapping.get(e.getId());
                                    if (dep != null) {
                                        deputy.setDeputy(dep);
                                        deputyRepository.save(deputy);
                                    }
                                });
                    }
                }catch (Exception e){logger.error(e.getMessage());}
            }
        });
    }



}
