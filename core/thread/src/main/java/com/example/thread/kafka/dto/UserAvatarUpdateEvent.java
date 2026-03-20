package com.example.thread.kafka.dto;

import java.util.UUID;

public record UserAvatarUpdateEvent(
        UUID userId,
        String newAvatarUrl
) {}