package com.fedf.backend.service;

import com.fedf.backend.dto.*;
import com.fedf.backend.model.User;
import com.fedf.backend.repository.UserRepository;
import com.fedf.backend.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    public AuthResponse signUp(SignUpRequest request) {
        // Check if username exists
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(false, "User with this username already exists");
        }

        // Check if email exists
        if (userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(false, "User with this email already exists");
        }

        // Create new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setAvatar("https://api.dicebear.com/7.x/avataaars/svg?seed=" + request.getUsername());
        user.setBio("Passionate learner");

        user = userRepository.save(user);

        // Generate token
        String token = tokenProvider.generateToken(user.getId());

        // Create user DTO
        UserDTO userDTO = convertToUserDTO(user);

        return new AuthResponse(true, "User registered successfully", userDTO, token);
    }

    public AuthResponse signIn(SignInRequest request) {
        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return new AuthResponse(false, "Invalid email or password");
        }

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new AuthResponse(false, "Invalid email or password");
        }

        // Generate token
        String token = tokenProvider.generateToken(user.getId());

        // Create user DTO
        UserDTO userDTO = convertToUserDTO(user);

        return new AuthResponse(true, "Login successful", userDTO, token);
    }

    private UserDTO convertToUserDTO(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setAvatar(user.getAvatar());
        dto.setBio(user.getBio());
        dto.setJoinDate(user.getJoinDate());
        return dto;
    }
}

