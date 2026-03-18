package com.example.thread.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record MediaRequest(
        @NotBlank String url,
        @NotBlank String type,
        @NotNull Integer width,
        @NotNull Integer height,
        String altText
) {}