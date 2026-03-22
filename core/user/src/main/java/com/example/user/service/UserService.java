package com.example.user.service;

import com.example.user.dto.request.UserProfileUpdateRequest;
import com.example.user.dto.response.UserProfileResponse;
import com.example.user.dto.response.UserResponse;
import jakarta.validation.Valid;

public interface UserService {

    UserResponse getUserByKeycloakId(String keycloakId);

    UserProfileResponse getUserByUsername(String username);

    UserResponse updateUserProfile(String keycloakId, @Valid UserProfileUpdateRequest request);
}
