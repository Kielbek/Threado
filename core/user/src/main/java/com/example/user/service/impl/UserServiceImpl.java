package com.example.user.service.impl;

import com.example.user.dto.response.UserProfileResponse;
import com.example.user.dto.response.UserResponse;
import com.example.user.exception.BusinessException;
import com.example.user.exception.ErrorCode;
import com.example.user.mapper.UserMapper;
import com.example.user.repository.UserRepository;
import com.example.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public UserResponse getUserByKeycloakId(String keycloakId) {
        return userRepository.findByKeycloakId(keycloakId)
                .map(userMapper::toResponse)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }

    @Override
    public UserProfileResponse getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .map(userMapper::toUserProfileResponse)
                .orElseThrow(() -> new BusinessException(ErrorCode.USER_NOT_FOUND));
    }
}
