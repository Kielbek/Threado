package com.example.media.dto;

public record UploadUrlResponse(
        String presignedUrl,
        String fileAccessUrl
) {}