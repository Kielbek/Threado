package com.example.user.dto.response;

import java.time.Instant;
import java.util.UUID;

public record UserResponse(
        UUID id,
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