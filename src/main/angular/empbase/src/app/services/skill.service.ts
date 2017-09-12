import { Injectable } from '@angular/core';
import { Skill } from '../models/skill';
import { SkillGroup } from '../models/skillGroup';
import { Http }    from '@angular/http';

@Injectable()
export class SkillService{

    constructor(private http: Http){}

    getAllSkills(){
        return this.http.get('/api/skill');
    }

    getSkill(id:number){
        return this.http.get('/api/skill/' + id);
    }

    create(skill:Skill){
        return this.http.post('/api/skill', skill);
    }

    update(skill:Skill){
        return this.http.put('/api/skill', skill);
    }

    delete(id:number){
        if(id) return this.http.delete('/api/skill/' + id);
    }

    getAllSkillGroups(){
        return this.http.get('/api/skill_group');
    }

    getSkillGroup(id:number){
        return this.http.get('/api/skill_group/' + id);
    }

    createSkillGroup(skillGroup:SkillGroup){
        return this.http.post('/api/skill_group', skillGroup);
    }

    updateSkillGroup(skillGroup:SkillGroup){
        return this.http.put('/api/skill_group', skillGroup);
    }

    deleteSkillGroup(id:number){
        if(id) return this.http.delete('/api/skill_group/' + id);
    }

}