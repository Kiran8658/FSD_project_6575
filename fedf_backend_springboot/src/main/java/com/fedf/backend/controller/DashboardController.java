package com.fedf.backend.controller;

import com.fedf.backend.dto.ActivityDataDTO;
import com.fedf.backend.dto.DashboardStatsDTO;
import com.fedf.backend.dto.InsightDTO;
import com.fedf.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getStats(Authentication authentication) {
        String userId = authentication.getName();
        DashboardStatsDTO stats = dashboardService.getStats(userId);
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/activities")
    public ResponseEntity<List<ActivityDataDTO>> getActivityData(
            Authentication authentication,
            @RequestParam(required = false) Integer days) {
        String userId = authentication.getName();
        List<ActivityDataDTO> data = dashboardService.getActivityData(userId, days);
        return ResponseEntity.ok(data);
    }

    @GetMapping("/insights")
    public ResponseEntity<List<InsightDTO>> getInsights(Authentication authentication) {
        String userId = authentication.getName();
        List<InsightDTO> insights = dashboardService.getInsights(userId);
        return ResponseEntity.ok(insights);
    }
}

