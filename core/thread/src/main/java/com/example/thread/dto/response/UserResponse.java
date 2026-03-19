package com.example.thread.dto.response;

public record UserResponse(
        String id,
        String name,
        String username,
        boolean verified
) {}
