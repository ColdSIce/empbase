package com.speechpro.empbase.empbase.controller.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppController {
    @GetMapping("/portal")
    public String greeting() {
        return "index.html";
    }
}
