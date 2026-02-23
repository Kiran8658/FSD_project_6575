package com.fedf.backend.service;

import com.fedf.backend.model.Skill;
import com.fedf.backend.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SkillService {

    @Autowired
    private SkillRepository skillRepository;

    public List<Skill> getUserSkills(String userId) {
        return skillRepository.findByUserIdOrderByLevelDesc(userId);
    }

    public Skill createSkill(String userId, String name, Integer level, String category) {
        // Check if skill already exists
        Optional<Skill> existing = skillRepository.findByUserIdAndName(userId, name);
        if (existing.isPresent()) {
            throw new RuntimeException("Skill already exists");
        }

        Skill skill = new Skill();
        skill.setUserId(userId);
        skill.setName(name);
        skill.setLevel(level != null ? level : 0);
        skill.setCategory(category);
        skill.setLastUpdated(LocalDateTime.now());

        return skillRepository.save(skill);
    }

    public Skill updateSkillLevel(String skillId, String userId, Integer level) {
        Skill skill = skillRepository.findById(skillId)
                .orElseThrow(() -> new RuntimeException("Skill not found"));

        if (!skill.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }

        skill.setLevel(level);
        skill.setLastUpdated(LocalDateTime.now());

        return skillRepository.save(skill);
    }

    public Skill getOrCreateSkill(String userId, String skillName) {
        Optional<Skill> existing = skillRepository.findByUserIdAndName(userId, skillName);

        if (existing.isPresent()) {
            return existing.get();
        }

        // Create new skill
        Skill newSkill = new Skill();
        newSkill.setUserId(userId);
        newSkill.setName(skillName);
        newSkill.setLevel(10);
        newSkill.setCategory("Other");
        newSkill.setLastUpdated(LocalDateTime.now());

        return skillRepository.save(newSkill);
    }

    public void incrementSkillLevel(Skill skill) {
        int newLevel = Math.min(100, skill.getLevel() + 1);
        skill.setLevel(newLevel);
        skill.setLastUpdated(LocalDateTime.now());
        skillRepository.save(skill);
    }
}

