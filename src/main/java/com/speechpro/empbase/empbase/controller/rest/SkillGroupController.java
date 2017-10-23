package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Skill;
import com.speechpro.empbase.empbase.model.entities.SkillGroup;
import com.speechpro.empbase.empbase.service.SkillGroupService;
import com.speechpro.empbase.empbase.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequestMapping("/api")
public class SkillGroupController {

    @Autowired
    private SkillGroupService skillGroupService;

    @Autowired
    private SkillService skillService;

    @RequestMapping(value = "/skill_group", method = RequestMethod.GET)
    List<SkillGroup> getAllSkillGroups(){
        return skillGroupService.getAll();
    }

    @RequestMapping(value = "/skill_group/{id}", method = RequestMethod.GET)
    SkillGroup getSkillGroup(@PathVariable Long id){
        return skillGroupService.getById(id);
    }

    @RequestMapping(value = "/skill_group", method = RequestMethod.POST)
    SkillGroup createSkillGroup(@RequestBody SkillGroup skillGroup){
        return skillGroupService.create(skillGroup);
    }

    @RequestMapping(value = "/skill_group", method = RequestMethod.PUT)
    SkillGroup updateSkillGroup(@RequestBody SkillGroup skillGroup){
        return skillGroupService.update(skillGroup);
    }

    @RequestMapping(value = "/skill_group/{id}", method = RequestMethod.DELETE)
    @Transactional
    ResponseEntity<SkillGroup> deleteSkillGroup(@PathVariable Long id){
        SkillGroup skillGroup = skillGroupService.getById(id);
        if(skillGroup != null){
            skillService.getBySkillGroup(skillGroup).forEach(s -> {
                s.setSkillGroup(null);
                skillService.update(s);
            });
            skillGroupService.delete(skillGroup);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
