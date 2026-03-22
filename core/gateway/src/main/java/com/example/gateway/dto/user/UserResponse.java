package com.example.gateway.dto.user;

import java.util.UUID;

public record UserResponse(
        UUID id,
        String name,
        String username,
        String avatarUrl,
        boolean verified
) {}
