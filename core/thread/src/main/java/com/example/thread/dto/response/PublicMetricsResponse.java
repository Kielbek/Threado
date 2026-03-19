package com.example.thread.dto.response;

public record PublicMetricsResponse(
        int retweetCount,
        int replyCount,
        int likeCount,
        int quoteCount,
        int bookmarkCount,
        int impressionCount
) {}
