package com.fedf.backend.service;

import com.fedf.backend.model.Activity;
import com.fedf.backend.model.Skill;
import com.fedf.backend.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private SkillService skillService;

    public Activity logActivity(String userId, String type, String title,
                               String description, Integer duration,
                               List<String> skillsRelated, LocalDateTime date) {
        Activity activity = new Activity(userId, type, title, description,
                                        duration, skillsRelated, date);
        activity = activityRepository.save(activity);

        // Auto-create/update skills
        if (skillsRelated != null && !skillsRelated.isEmpty()) {
            for (String skillName : skillsRelated) {
                Skill skill = skillService.getOrCreateSkill(userId, skillName);
                skillService.incrementSkillLevel(skill);
            }
        }

        return activity;
    }

    public Page<Activity> getUserActivities(String userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("date").descending());
        return activityRepository.findByUserIdOrderByDateDesc(userId, pageable);
    }
}

