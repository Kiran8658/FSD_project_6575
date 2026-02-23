package com.fedf.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 30, message = "Username must be between 3 and 30 characters")
    @Indexed(unique = true)
    private String username;

    @NotBlank(message = "Email is required")
    @Email(message = "Email should be valid")
    @Indexed(unique = true)
    private String email;

    @NotBlank(message = "Password is required")
    @Size(min = 6, message = "Password must be at least 6 characters")
    @JsonIgnore
    private String password;

    private String avatar;

    @Size(max = 500, message = "Bio must not exceed 500 characters")
    private String bio;

    @CreatedDate
    private LocalDateTime joinDate;

    // Constructor for creating user with defaults
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.avatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=" + username;
        this.bio = "Passionate learner";
        this.joinDate = LocalDateTime.now();
    }
}

