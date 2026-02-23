package com.fedf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsDTO {
    private Long totalActivities;
    private Integer currentStreak;
    private Integer longestStreak;
    private Integer consistencyRate;
    private Long skillsLearned;
}

