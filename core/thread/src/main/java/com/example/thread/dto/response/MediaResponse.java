package com.example.thread.dto.response;

public record MediaResponse(
        String url,
        String type,
        Integer width,
        Integer height,
        String altText
) {}