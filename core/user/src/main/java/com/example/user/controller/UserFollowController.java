package com.example.user.controller;

import com.example.user.service.UserFollowService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User Follows", description = "Endpoints for managing follow relationships between users")
public class UserFollowController {

    private final UserFollowService followService;

    @Operation(
            summary = "Follow a user",
            description = "Creates a follow relationship between the authenticated user and the target user, and updates social counters."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully followed"),
            @ApiResponse(responseCode = "400", description = "Cannot follow yourself or the target user does not exist"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Valid JWT token required")
    })
    @PostMapping("/{userId}/follow")
    public ResponseEntity<Void> follow(
            @PathVariable UUID userId,
            @AuthenticationPrincipal Jwt jwt) {

        followService.follow(getUserId(jwt), userId);
        return ResponseEntity.ok().build();
    }

    @Operation(
            summary = "Unfollow a user",
            description = "Removes the follow relationship and updates social counters."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully unfollowed"),
            @ApiResponse(responseCode = "401", description = "Unauthorized - Valid JWT token required")
    })
    @DeleteMapping("/{userId}/unfollow")
    public ResponseEntity<Void> unfollow(
            @PathVariable UUID userId,
            @AuthenticationPrincipal Jwt jwt) {

        followService.unfollow(getUserId(jwt), userId);
        return ResponseEntity.noContent().build();
    }

    private UUID getUserId(Jwt jwt) {
        return UUID.fromString(jwt.getSubject());
    }
}