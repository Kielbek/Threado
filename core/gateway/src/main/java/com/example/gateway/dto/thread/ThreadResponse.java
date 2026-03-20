package com.example.gateway.dto.thread;

import com.example.gateway.dto.user.UserResponse;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

public record ThreadResponse(
        UUID id,
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