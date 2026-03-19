package com.example.user.kafka.dto;

public record UserProfileSyncEvent(
        String userId,
        String username,
        String firstName,
        String lastName,
        String avatarUrl
) {}