package com.example.user.dto.response;

import java.time.Instant;

public record UserProfileResponse(
        String id,
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