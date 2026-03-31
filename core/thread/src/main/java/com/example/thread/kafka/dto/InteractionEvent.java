package com.example.thread.kafka.dto;

import java.util.UUID;

public record InteractionEvent(
        UUID threadId,
        UUID userId,
        InteractionType type
) {
    public enum InteractionType {
        LIKE,
        UNLIKE,
        BOOKMARK,
        UNBOOKMARK
    }
}