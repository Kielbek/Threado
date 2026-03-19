package com.example.user.dto.response;

import java.time.Instant;
import java.util.UUID;

public record UserProfileResponse(
        UUID id,
        String username,
        String firstName,
        String lastName,
        String bio,
        String websiteUrl,
        String avatarUrl,
        long followersCount,
        long followingCount,
        Instant joinedAt
) {
}