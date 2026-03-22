package com.example.user.service.impl;

import com.example.user.dto.request.UserProfileUpdateRequest;
import com.example.user.dto.response.UserResponse;
import com.example.user.entity.User;
import com.example.user.exception.BusinessException;
import com.example.user.exception.ErrorCode;
import com.example.user.kafka.UserEventProducer;
import com.example.user.mapper.UserMapper;
import com.example.user.repository.UserRepository;
import com.example.user.service.KeycloakUserService;
import com.example.user.service.UserService;
import jakarta.ws.rs.ClientErrorException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final KeycloakUserService keycloakUserService;
    private final UserEventProducer userEventProducer;

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserByKeycloakId(String keycloakId) {
        return userRepository.findByKeycloakId(keycloakId)
                .map(userMapper::toUserResponse)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    @Override
    public UserResponse getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::toUserResponse)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    @Override
    @Transactional
    public UserResponse updateUserProfile(String keycloakId, UserProfileUpdateRequest request) {
        log.info("Starting complete profile update process for user: {}", keycloakId);

        try {
            keycloakUserService.updateBasicUserInfo(
                    keycloakId,
                    request.firstName(),
                    request.lastName(),
                    request.username()
            );
        } catch (ClientErrorException e) {
            if (e.getResponse().getStatus() == 409) {
                log.warn("Conflict in Keycloak: Username '{}' is already taken.", request.username());
                throw new BusinessException(ErrorCode.USERNAME_ALREADY_EXISTS);
            }
            String errorMessage = e.getResponse().readEntity(String.class);
            log.error("Failed to update Keycloak. Status: {}. Reason: {}", e.getResponse().getStatus(), errorMessage);
            throw new BusinessException(ErrorCode.KEYCLOAK_UPDATE_FAILED);
        }

        User user = updateLocalUserProfile(keycloakId, request);

        userEventProducer.sendProfileSyncEvent(user);
        log.info("Successfully completed profile update process for user: {}", keycloakId);

        return userMapper.toUserResponse(user);
    }

    public User updateLocalUserProfile(String keycloakId, UserProfileUpdateRequest request) {
        log.debug("Updating local database record for user ID: {}", keycloakId);

        User user = userRepository.findByKeycloakId(keycloakId)
                .orElseThrow(() -> {
                    log.error("User with Keycloak ID {} not found in the local database.", keycloakId);
                    return new BusinessException(ErrorCode.USER_NOT_FOUND);
                });

        if (request.firstName() != null) {
            user.setFirstName(request.firstName());
        }

        if (request.lastName() != null) {
            user.setLastName(request.lastName());
        }

        if (request.username() != null) {
            user.setUsername(request.username());
        }

        if (request.bio() != null) {
            user.setBio(request.bio());
        }

        if (request.websiteUrl() != null) {
            user.setWebsiteUrl(request.websiteUrl());
        }

        if (request.avatarUrl() != null) {
            user.setAvatarUrl(request.avatarUrl());
        }

        if (request.coverUrl() != null) {
            user.setCoverUrl(request.coverUrl());
        }

        userRepository.save(user);
        log.debug("Local database record updated successfully for user ID: {}", keycloakId);

        return user;
    }
}
