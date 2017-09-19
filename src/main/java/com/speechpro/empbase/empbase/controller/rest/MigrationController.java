package com.speechpro.empbase.empbase.controller.rest;

import com.speechpro.empbase.empbase.service.MigrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/migration")
public class MigrationController {

    @Autowired
    private MigrationService migrationService;

    @RequestMapping("/start")
    public void start(){
        migrationService.synchData();
    }
}
