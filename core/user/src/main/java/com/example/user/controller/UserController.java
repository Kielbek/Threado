package com.example.user.controller;

import com.example.user.dto.response.UserProfileResponse;
import com.example.user.dto.response.UserResponse;
import com.example.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "Endpoints for managing user profiles")
public class UserController {

    private final UserService userService;

    @Operation(
            summary = "Get current user profile",
            description = "Fetches the full, private profile of the currently authenticated user based on their JWT token."
    )
    @ApiResponse(responseCode = "200", description = "User profile retrieved successfully")
    @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing JWT token")
    @ApiResponse(responseCode = "404", description = "User not found in the local database")
    @GetMapping("/me")
    public UserResponse getCurrentUser(@AuthenticationPrincipal Jwt jwt) {
        String keycloakId = jwt.getSubject();

        return userService.getUserByKeycloakId(keycloakId);
    }

    @Operation(
            summary = "Get public user profile by username",
            description = "Fetches the public profile of a user. Safe to display on the frontend."
    )
    @ApiResponse(responseCode = "200", description = "Public profile retrieved successfully")
    @ApiResponse(responseCode = "404", description = "User not found")
    @GetMapping("/public/{username}")
    public UserProfileResponse getPublicProfile(@PathVariable String username) {

        return userService.getUserByUsername(username);
    }
}