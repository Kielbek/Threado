package com.example.interactions.dto;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.UUID;

@Schema(description = "Response containing interaction status for a specific thread")
public record InteractionStatusResponse(
        @Schema(description = "Unique identifier of the thread", example = "123e4567-e89b-12d3-a456-426614174000")
        UUID threadId,

        @Schema(description = "True if the current user has liked this thread", example = "true")
        boolean isLiked,

        @Schema(description = "True if the current user has bookmarked this thread", example = "false")
        boolean isBookmarked,

        @Schema(description = "True if the current user has repost this thread", example = "false")
        boolean isReposted
) {}