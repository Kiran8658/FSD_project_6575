package com.fedf.backend.controller;

import com.fedf.backend.dto.ApiResponse;
import com.fedf.backend.model.Activity;
import com.fedf.backend.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @PostMapping("/log")
    public ResponseEntity<?> logActivity(
            Authentication authentication,
            @RequestBody Map<String, Object> request) {
        try {
            String userId = authentication.getName();
            String type = (String) request.get("type");
            String title = (String) request.get("title");
            String description = (String) request.get("description");
            Integer duration = request.containsKey("duration") ?
                (Integer) request.get("duration") : null;

            @SuppressWarnings("unchecked")
            List<String> skillsRelated = (List<String>) request.get("skillsRelated");

            LocalDateTime date = request.containsKey("date") && request.get("date") != null ?
                LocalDateTime.parse((String) request.get("date")) : null;

            Activity activity = activityService.logActivity(
                userId, type, title, description, duration, skillsRelated, date
            );

            return ResponseEntity.ok(ApiResponse.success("Activity logged successfully", activity));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Error logging activity: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getActivities(
            Authentication authentication,
            @RequestParam(defaultValue = "0") int skip,
            @RequestParam(defaultValue = "50") int limit) {
        String userId = authentication.getName();
        int page = skip / limit;

        Page<Activity> activitiesPage = activityService.getUserActivities(userId, page, limit);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("data", activitiesPage.getContent());

        Map<String, Object> pagination = new HashMap<>();
        pagination.put("total", activitiesPage.getTotalElements());
        pagination.put("limit", limit);
        pagination.put("skip", skip);
        pagination.put("hasMore", activitiesPage.hasNext());
        response.put("pagination", pagination);

        return ResponseEntity.ok(response);
    }
}

