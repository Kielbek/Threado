package com.example.thread.kafka.dto;

public record UserAvatarUpdateEvent(
        String userId,
        String newAvatarUrl
) {}