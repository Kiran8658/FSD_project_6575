package com.fedf.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "skills")
@CompoundIndex(name = "user_skill", def = "{'userId': 1, 'name': 1}", unique = true)
public class Skill {

    @Id
    private String id;

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Skill name is required")
    private String name;

    @Min(value = 0, message = "Level must be at least 0")
    @Max(value = 100, message = "Level must not exceed 100")
    private Integer level = 0;

    @NotBlank(message = "Category is required")
    private String category;

    @LastModifiedDate
    private LocalDateTime lastUpdated;

    public Skill(String userId, String name, Integer level, String category) {
        this.userId = userId;
        this.name = name;
        this.level = level;
        this.category = category;
        this.lastUpdated = LocalDateTime.now();
    }
}

