package com.example.user.controller;

import com.example.user.dto.response.UserResponse;
import com.example.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "Endpoints for managing user profiles")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Get current user profile", description = "Fetches the profile of the currently authenticated user based on their JWT token.")
    @ApiResponse(responseCode = "200", description = "User profile retrieved successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing JWT token")
    @ApiResponse(responseCode = "404", description = "User not found in the local database")
    @GetMapping("/me") 
    public UserResponse getCurrentUser(@AuthenticationPrincipal Jwt jwt) {

        String keycloakId = jwt.getSubject();

        return userService.getUserByKeycloakId(keycloakId);
    }
}
