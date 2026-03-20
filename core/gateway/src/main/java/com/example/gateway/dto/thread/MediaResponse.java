package com.example.gateway.dto.thread;

public record MediaResponse(
        String url,
        String type,
        Integer width,
        Integer height,
        String altText
) {}