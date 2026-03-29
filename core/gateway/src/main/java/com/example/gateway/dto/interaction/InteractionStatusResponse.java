package com.example.gateway.dto.interaction;

import java.util.UUID;

public record InteractionStatusResponse(
        UUID threadId,
        boolean isLiked,
        boolean isBookmarked,
        boolean isReposted
) {}