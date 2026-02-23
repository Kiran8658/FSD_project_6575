package com.fedf.backend.repository;

import com.fedf.backend.model.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SkillRepository extends MongoRepository<Skill, String> {

    List<Skill> findByUserIdOrderByLevelDesc(String userId);

    Optional<Skill> findByUserIdAndName(String userId, String name);

    Long countByUserId(String userId);
}

