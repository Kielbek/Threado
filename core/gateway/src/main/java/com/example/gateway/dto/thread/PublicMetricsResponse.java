package com.example.gateway.dto.thread;

public record PublicMetricsResponse(
        int likeCount,
        int bookmarkCount,
        int repostCount,
        int replyCount
) {}
