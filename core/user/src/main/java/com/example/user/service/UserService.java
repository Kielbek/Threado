package com.example.user.service;

import com.example.user.dto.request.UserProfileUpdateRequest;
import com.example.user.dto.response.UserResponse;
import jakarta.validation.Valid;

import java.util.UUID;

public interface UserService {

    UserResponse getUserByKeycloakId(UUID keycloakId);

    UserResponse getUserByUsername(UUID currentUser, String username);

    UserResponse updateUserProfile(UUID keycloakId, @Valid UserProfileUpdateRequest request);
}
