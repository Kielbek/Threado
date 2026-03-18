package com.example.thread.dto.response;

public record HashtagResponse(
        int startIdx,
        int endIdx,
        String tag
) {}