package com.example.thread.dto.response;

import java.time.Instant;
import java.util.List;

public record ThreadResponse(
        String id,
        String text,
        Instant createdAt,
        String replySettings,
        String lang,
        PublicMetricsResponse publicMetrics,
        List<HashtagResponse> hashtags,
        List<UrlEntityResponse> urls,
        List<MediaResponse> media,
        UserResponse author
) {}