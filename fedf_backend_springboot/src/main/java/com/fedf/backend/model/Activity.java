package com.fedf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "activities")
public class Activity {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    @Indexed
    private String userId;

    @NotBlank(message = "Activity type is required")
    private String type; // learning, practice, project, reading, watching, other

    @NotBlank(message = "Title is required")
    @Size(max = 200, message = "Title must not exceed 200 characters")
    private String title;

    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    private String description;

    private Integer duration; // in minutes

    private List<String> skillsRelated;

    @Indexed
    private LocalDateTime date;

    @CreatedDate
    private LocalDateTime createdAt;

    public Activity(String userId, String type, String title, String description,
                   Integer duration, List<String> skillsRelated, LocalDateTime date) {
        this.userId = userId;
        this.type = type;
        this.title = title;
        this.description = description;
        this.duration = duration;
        this.skillsRelated = skillsRelated;
        this.date = date != null ? date : LocalDateTime.now();
        this.createdAt = LocalDateTime.now();
    }
}

