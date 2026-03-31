package com.example.thread.dto.response;

public record PublicMetricsResponse(
        int likeCount,
        int bookmarkCount,
        int repostCount,
        int replyCount
) {}
