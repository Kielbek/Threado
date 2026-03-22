package com.example.user.dto.request;

import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UserProfileUpdateRequest(
        @Size(max = 50, message = "First name must not exceed 50 characters")
        String firstName,

        @Size(max = 50, message = "Last name must not exceed 50 characters")
        String lastName,

        @Size(max = 30, message = "Username must not exceed 30 characters")
        String username,

        @Size(max = 160, message = "Bio must not exceed 160 characters")
        String bio,

        @Pattern(regexp = "^(https?://.+)?$", message = "Avatar URL must be a valid URL")
        String avatarUrl,

        @Pattern(regexp = "^(https?://.+)?$", message = "Cover URL must be a valid URL")
        String coverUrl
) {}