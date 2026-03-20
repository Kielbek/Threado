package com.example.gateway.dto.interaction;

public record InteractionContextResponse(
        boolean isLiked,
        boolean isBookmarked
) {}
