package com.example.user.service.impl;

import com.example.user.entity.UserFollow;
import com.example.user.exception.BusinessException;
import com.example.user.exception.ErrorCode;
import com.example.user.repository.UserFollowRepository;
import com.example.user.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserFollowServiceImplTest {

    @Mock
    private UserFollowRepository followRepository;
    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserFollowServiceImpl followService;

    private UUID followerId;
    private UUID followeeId;

    @BeforeEach
    void setUp() {
        followerId = UUID.randomUUID();
        followeeId = UUID.randomUUID();
    }

    @Test
    @DisplayName("Should throw CANNOT_FOLLOW_SELF when IDs are identical")
    void shouldThrowExceptionWhenFollowingSelf() {
        BusinessException exception = assertThrows(BusinessException.class, () ->
                followService.follow(followerId, followerId)
        );

        assertEquals(ErrorCode.CANNOT_FOLLOW_SELF, exception.getErrorCode());

        verifyNoInteractions(followRepository);
        verifyNoInteractions(userRepository);
    }

    @Test
    @DisplayName("Should successfully follow and increment counters")
    void shouldFollowSuccessfully() {
        when(followRepository.existsByFollowerIdAndFolloweeId(followerId, followeeId)).thenReturn(false);

        followService.follow(followerId, followeeId);

        verify(followRepository).save(any(UserFollow.class));
        verify(userRepository).incrementFollowingCount(followerId);
        verify(userRepository).incrementFollowersCount(followeeId);
    }

    @Test
    @DisplayName("Should fail unfollow if no relation exists")
    void shouldThrowExceptionWhenUnfollowingWithoutRelation() {
        when(followRepository.existsByFollowerIdAndFolloweeId(followerId, followeeId)).thenReturn(false);

        BusinessException exception = assertThrows(BusinessException.class, () ->
                followService.unfollow(followerId, followeeId)
        );

        assertEquals(ErrorCode.FOLLOW_RELATION_NOT_FOUND, exception.getErrorCode());
        verify(followRepository, never()).deleteByFollowerIdAndFolloweeId(any(), any());
    }

    @Test
    @DisplayName("Should unfollow and decrement counters successfully")
    void shouldUnfollowSuccessfully() {
        when(followRepository.existsByFollowerIdAndFolloweeId(followerId, followeeId)).thenReturn(true);

        followService.unfollow(followerId, followeeId);

        verify(followRepository).deleteByFollowerIdAndFolloweeId(followerId, followeeId);
        verify(userRepository).decrementFollowingCount(followerId);
        verify(userRepository).decrementFollowersCount(followeeId);
    }
}