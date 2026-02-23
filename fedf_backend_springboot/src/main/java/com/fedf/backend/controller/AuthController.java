package com.fedf.backend.controller;

import com.fedf.backend.dto.AuthResponse;
import com.fedf.backend.dto.AuthResponseBody;
import com.fedf.backend.dto.SignInRequest;
import com.fedf.backend.dto.SignUpRequest;
import com.fedf.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@Valid @RequestBody SignUpRequest request) {
        AuthResponse response = authService.signUp(request);

        if (!response.isSuccess()) {
            return ResponseEntity.badRequest().body(response);
        }

        // Return only user and token for frontend compatibility
        AuthResponseBody body = new AuthResponseBody(response.getUser(), response.getToken());
        return ResponseEntity.ok(body);
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@Valid @RequestBody SignInRequest request) {
        AuthResponse response = authService.signIn(request);

        if (!response.isSuccess()) {
            return ResponseEntity.status(401).body(response);
        }

        // Return only user and token for frontend compatibility
        AuthResponseBody body = new AuthResponseBody(response.getUser(), response.getToken());
        return ResponseEntity.ok(body);
    }
}

