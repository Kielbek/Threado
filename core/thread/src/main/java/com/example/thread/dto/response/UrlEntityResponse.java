package com.example.thread.dto.response;

public record UrlEntityResponse(
        int startIdx,
        int endIdx,
        String url,
        String expandedUrl,
        String displayUrl
) {}