package com.sameera.backend.controller;

import org.springframework.web.bind.annotation.*;
import com.sameera.backend.service.DashboardService;
import com.sameera.backend.dto.DashboardDTO;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/student/{email}")
    public DashboardDTO getDashboard(@PathVariable String email) {
        return dashboardService.getDashboardData(email);
    }
}