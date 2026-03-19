package com.example.interactions.kafka.dto;

import com.example.interactions.enums.InteractionType;

import java.time.Instant;
import java.util.UUID;

public record InteractionEvent(
        UUID eventId,
        UUID threadId,
        UUID userId,
        InteractionType type,
        Instant timestamp
) {}