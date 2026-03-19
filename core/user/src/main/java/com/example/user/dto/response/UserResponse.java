package com.example.user.dto.response;

public record UserResponse(
        String id,
        String firstName,
        String lastName,
        String username,
        String email,
        String avatarUrl
) {}
