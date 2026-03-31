package com.example.user.controller;

import com.example.user.dto.request.UserProfileUpdateRequest;
import com.example.user.dto.response.UserResponse;
import com.example.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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

        return userService.getUserByKeycloakId(getUserId(jwt));
    }

    @Operation(
            summary = "Get public user profile by username",
            description = "Fetches the public profile of a user. Safe to display on the frontend."
    )
    @ApiResponse(responseCode = "200", description = "Public profile retrieved successfully")
    @ApiResponse(responseCode = "404", description = "User not found")
    @GetMapping("/public/{username}")
    public UserResponse getPublicProfile(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable String username
    ) {

        return userService.getUserByUsername(getUserId(jwt), username);
    }

    @Operation(
            summary = "Update current user profile",
            description = "Updates the authenticated user's profile, including text fields (firstName, bio, website) and images (avatar, cover). Uses multipart/form-data."
    )
    @ApiResponse(responseCode = "204", description = "Profile updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data (e.g., file too large, validation error)")
    @ApiResponse(responseCode = "401", description = "Unauthorized - Invalid or missing JWT token")
    @PutMapping(value = "/me")
    public ResponseEntity<UserResponse> updateCurrentUser(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody UserProfileUpdateRequest request
    ) {
        UserResponse userResponse = userService.updateUserProfile(getUserId(jwt), request);

        return ResponseEntity.ok(userResponse);
    }

    private UUID getUserId(Jwt jwt) {
        if (jwt == null) {
            return null;
        }
        return UUID.fromString(jwt.getSubject());
    }
}