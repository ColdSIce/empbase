package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.model.entities.Skill;
import com.speechpro.empbase.empbase.model.entities.SkillGroup;
import com.speechpro.empbase.empbase.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @RequestMapping(value = "/skill", method = RequestMethod.GET)
    List<Skill> getAllSkills(){
        return skillService.getAll();
    }

    @RequestMapping(value = "/skill/{id}", method = RequestMethod.GET)
    Skill getSkill(@PathVariable Long id){
        return skillService.getById(id);
    }

    @RequestMapping(value = "/skill", method = RequestMethod.POST)
    Skill createSkill(@RequestBody Skill skill){
        return skillService.create(skill);
    }

    @RequestMapping(value = "/skill", method = RequestMethod.PUT)
    Skill updateSkill(@RequestBody Skill skill){
        return skillService.update(skill);
    }

    @RequestMapping(value = "/skill/{id}", method = RequestMethod.DELETE)
    ResponseEntity<Skill> deleteSkill(@PathVariable Long id){
        Skill skill = skillService.getById(id);
        if(skill != null){
            skillService.delete(skill);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);//204
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
