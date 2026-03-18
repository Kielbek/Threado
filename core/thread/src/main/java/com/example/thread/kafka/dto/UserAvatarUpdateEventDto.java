package com.example.thread.kafka.dto;

public record UserAvatarUpdateEventDto(
        String userId,
        String newAvatarUrl
) {}
