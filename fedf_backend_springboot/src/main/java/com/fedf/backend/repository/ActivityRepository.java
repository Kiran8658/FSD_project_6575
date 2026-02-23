package com.fedf.backend.repository;

import com.fedf.backend.model.Activity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ActivityRepository extends MongoRepository<Activity, String> {

    List<Activity> findByUserIdOrderByDateDesc(String userId);

    Page<Activity> findByUserIdOrderByDateDesc(String userId, Pageable pageable);

    List<Activity> findByUserIdAndDateGreaterThanEqualOrderByDateDesc(
        String userId, LocalDateTime startDate);

    Long countByUserId(String userId);
}

