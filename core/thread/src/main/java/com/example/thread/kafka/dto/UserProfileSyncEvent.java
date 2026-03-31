package com.example.thread.kafka.dto;

import java.util.UUID;

public record UserProfileSyncEvent(
        UUID userId,
        String username,
        String firstName,
        String lastName,
        String avatarUrl
) {}