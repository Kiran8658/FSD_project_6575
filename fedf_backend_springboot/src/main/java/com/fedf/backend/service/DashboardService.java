package com.fedf.backend.service;

import com.fedf.backend.dto.*;
import com.fedf.backend.model.Activity;
import com.fedf.backend.model.User;
import com.fedf.backend.repository.ActivityRepository;
import com.fedf.backend.repository.SkillRepository;
import com.fedf.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private UserRepository userRepository;

    public DashboardStatsDTO getStats(String userId) {
        // Get total activities
        Long totalActivities = activityRepository.countByUserId(userId);

        // Get activities for streak calculation
        List<Activity> activities = activityRepository.findByUserIdOrderByDateDesc(userId);

        // Calculate streaks
        int[] streaks = calculateStreaks(activities);
        int currentStreak = streaks[0];
        int longestStreak = streaks[1];

        // Calculate consistency rate
        User user = userRepository.findById(userId).orElseThrow();
        long daysSinceJoin = ChronoUnit.DAYS.between(
            user.getJoinDate().toLocalDate(),
            LocalDate.now()
        ) + 1;

        Set<LocalDate> uniqueDates = activities.stream()
                .map(a -> a.getDate().toLocalDate())
                .collect(Collectors.toSet());

        int consistencyRate = (int) Math.min(100,
            Math.round((uniqueDates.size() * 100.0) / daysSinceJoin));

        // Get skills learned
        Long skillsLearned = skillRepository.countByUserId(userId);

        return new DashboardStatsDTO(
            totalActivities,
            currentStreak,
            longestStreak,
            consistencyRate,
            skillsLearned
        );
    }

    private int[] calculateStreaks(List<Activity> activities) {
        if (activities.isEmpty()) {
            return new int[]{0, 0};
        }

        Set<LocalDate> uniqueDates = activities.stream()
                .map(a -> a.getDate().toLocalDate())
                .collect(Collectors.toSet());

        List<LocalDate> sortedDates = uniqueDates.stream()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

        int currentStreak = 0;
        int longestStreak = 0;
        int tempStreak = 0;
        LocalDate lastDate = null;

        for (LocalDate date : sortedDates) {
            if (lastDate == null) {
                tempStreak = 1;
                lastDate = date;
            } else {
                long diffDays = ChronoUnit.DAYS.between(date, lastDate);

                if (diffDays == 1) {
                    // Consecutive day
                    tempStreak++;
                    lastDate = date;
                } else {
                    // Streak broken
                    if (tempStreak > longestStreak) {
                        longestStreak = tempStreak;
                    }
                    tempStreak = 1;
                    lastDate = date;
                }
            }
        }

        // Update longest streak
        if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
        }

        // Check if current streak is ongoing
        LocalDate today = LocalDate.now();
        LocalDate mostRecentDate = sortedDates.get(0);
        long daysSinceLastActivity = ChronoUnit.DAYS.between(mostRecentDate, today);

        if (daysSinceLastActivity <= 1) {
            currentStreak = tempStreak;
        }

        return new int[]{currentStreak, longestStreak};
    }

    public List<ActivityDataDTO> getActivityData(String userId, Integer days) {
        if (days == null) {
            days = 30;
        }

        LocalDateTime startDate = LocalDateTime.now().minusDays(days);
        List<Activity> activities = activityRepository
            .findByUserIdAndDateGreaterThanEqualOrderByDateDesc(userId, startDate);

        Map<LocalDate, Long> activityMap = activities.stream()
                .collect(Collectors.groupingBy(
                    a -> a.getDate().toLocalDate(),
                    Collectors.counting()
                ));

        return activityMap.entrySet().stream()
                .map(entry -> new ActivityDataDTO(
                    entry.getKey().toString(),
                    entry.getValue()
                ))
                .sorted(Comparator.comparing(ActivityDataDTO::getDate))
                .collect(Collectors.toList());
    }

    public List<InsightDTO> getInsights(String userId) {
        List<InsightDTO> insights = new ArrayList<>();

        // Get stats
        Long totalActivities = activityRepository.countByUserId(userId);

        // Get recent activity
        List<Activity> recentActivities = activityRepository
            .findByUserIdAndDateGreaterThanEqualOrderByDateDesc(
                userId,
                LocalDateTime.now().minusDays(1)
            );

        if (!recentActivities.isEmpty()) {
            insights.add(new InsightDTO(
                "daily_active",
                "Great Work Today!",
                "You've logged activity today. Keep the momentum going!",
                "achievement",
                "🎉",
                LocalDateTime.now().toString()
            ));
        }

        // Milestone insights
        if (totalActivities >= 100) {
            insights.add(new InsightDTO(
                "milestone_100",
                "Century Club!",
                String.format("You've completed %d+ learning activities. Amazing dedication! 🚀", totalActivities),
                "milestone",
                "🏆",
                LocalDateTime.now().toString()
            ));
        } else if (totalActivities >= 50) {
            insights.add(new InsightDTO(
                "milestone_50",
                "Half Century!",
                String.format("You've reached %d activities. You're on fire!", totalActivities),
                "milestone",
                "🔥",
                LocalDateTime.now().toString()
            ));
        }

        // Default motivational insight
        if (insights.isEmpty()) {
            insights.add(new InsightDTO(
                "motivational",
                "Keep Learning!",
                "Every day is an opportunity to learn something new. Start your learning journey today!",
                "tip",
                "📚",
                LocalDateTime.now().toString()
            ));
        }

        return insights;
    }
}

