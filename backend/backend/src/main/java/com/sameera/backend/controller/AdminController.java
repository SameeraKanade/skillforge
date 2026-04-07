package com.sameera.backend.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

import com.sameera.backend.service.AdminDashboardService;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin
public class AdminController {

    private final AdminDashboardService service;

    public AdminController(AdminDashboardService service) {
        this.service = service;
    }

    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {
        return service.getDashboardData();
    }
}