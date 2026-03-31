package com.example.thread.kafka.dto;

import java.util.UUID;


public record ThreadInteractionEvent(
        UUID targetThreadId,
        UUID authorId,
        boolean isCreated
) {}
