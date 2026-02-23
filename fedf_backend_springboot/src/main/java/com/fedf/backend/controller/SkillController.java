package com.fedf.backend.controller;

import com.fedf.backend.dto.ApiResponse;
import com.fedf.backend.model.Skill;
import com.fedf.backend.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    @GetMapping
    public ResponseEntity<List<Skill>> getSkills(Authentication authentication) {
        String userId = authentication.getName();
        List<Skill> skills = skillService.getUserSkills(userId);
        return ResponseEntity.ok(skills);
    }

    @PostMapping
    public ResponseEntity<?> createSkill(
            Authentication authentication,
            @RequestBody Map<String, Object> request) {
        try {
            String userId = authentication.getName();
            String name = (String) request.get("name");
            Integer level = request.containsKey("level") ?
                (Integer) request.get("level") : 0;
            String category = (String) request.get("category");

            Skill skill = skillService.createSkill(userId, name, level, category);
            return ResponseEntity.ok(skill);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error(e.getMessage()));
        }
    }

    @PutMapping("/{skillId}")
    public ResponseEntity<?> updateSkillLevel(
            Authentication authentication,
            @PathVariable String skillId,
            @RequestBody Map<String, Integer> request) {
        try {
            String userId = authentication.getName();
            Integer level = request.get("level");

            if (level == null || level < 0 || level > 100) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Level must be between 0 and 100"));
            }

            Skill skill = skillService.updateSkillLevel(skillId, userId, level);
            return ResponseEntity.ok(ApiResponse.success("Skill level updated successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error(e.getMessage()));
        }
    }
}

