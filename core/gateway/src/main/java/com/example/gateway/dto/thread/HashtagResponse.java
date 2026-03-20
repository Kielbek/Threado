package com.example.gateway.dto.thread;

public record HashtagResponse(
        int startIdx,
        int endIdx,
        String tag
) {}