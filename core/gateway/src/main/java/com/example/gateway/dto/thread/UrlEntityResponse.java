package com.example.gateway.dto.thread;

public record UrlEntityResponse(
        int startIdx,
        int endIdx,
        String url,
        String expandedUrl,
        String displayUrl
) {}