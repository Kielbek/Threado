package com.example.thread.kafka.dto;

public record UserProfileSyncEvent(
        String userId,
        String username,
        String firstName,
        String lastName,
        String avatarUrl
) {}