package com.example.gateway.dto.thread;

public record PublicMetricsResponse(
        int retweetCount,
        int replyCount,
        int likeCount,
        int quoteCount,
        int bookmarkCount,
        int impressionCount
) {}
