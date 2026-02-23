package com.fedf.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InsightDTO {
    private String id;
    private String title;
    private String description;
    private String type; // tip, achievement, milestone
    private String icon;
    private String timestamp;
}

