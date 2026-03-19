package com.example.user.service;

import com.example.user.dto.response.UserResponse;

public interface UserService {

    UserResponse getUserByKeycloakId(String keycloakId);
}
