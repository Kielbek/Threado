package com.example.interactions.kafka.dto;

import com.example.interactions.enums.InteractionType;

import java.util.UUID;

public record InteractionEvent(
        UUID threadId,
        UUID userId,
        InteractionType type
) {}