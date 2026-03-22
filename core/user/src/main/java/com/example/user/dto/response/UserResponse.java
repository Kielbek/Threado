package com.example.user.dto.response;

import java.time.Instant;

public record UserResponse(
        String id,
        String username,
        String firstName,
        String lastName,
        String bio,
        String websiteUrl,
        String avatarUrl,
        String coverUrl,
        long followersCount,
        long followingCount,
        Instant joinedAt,
        boolean isFollowedByMe
) {
}