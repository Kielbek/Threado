package com.example.user.service.impl;

import com.example.user.entity.UserFollow;
import com.example.user.exception.BusinessException;
import com.example.user.exception.ErrorCode;
import com.example.user.repository.UserFollowRepository;
import com.example.user.repository.UserRepository;
import com.example.user.service.UserFollowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserFollowServiceImpl implements UserFollowService {

    private final UserFollowRepository followRepository;
    private final UserRepository userRepository;

    @Transactional
    public void follow(UUID followerId, UUID followeeId) {
        if (followerId.equals(followeeId)) {
            throw new BusinessException(ErrorCode.CANNOT_FOLLOW_SELF);
        }

        if (!followRepository.existsByFollowerIdAndFolloweeId(followerId, followeeId)) {
            followRepository.save(UserFollow.builder()
                    .followerId(followerId)
                    .followeeId(followeeId)
                    .build()
            );

            userRepository.incrementFollowingCount(followerId);
            userRepository.incrementFollowersCount(followeeId);
            log.info("User {} is now following {}", followerId, followeeId);
        }
    }

    @Transactional
    public void unfollow(UUID followerId, UUID followeeId) {
        if (followRepository.existsByFollowerIdAndFolloweeId(followerId, followeeId)) {
            followRepository.deleteByFollowerIdAndFolloweeId(followerId, followeeId);

            userRepository.decrementFollowingCount(followerId);
            userRepository.decrementFollowersCount(followeeId);
            log.info("User {} unfollowed {}", followerId, followeeId);
        } else {
            log.warn("Unfollow failed: User {} was not following {}", followerId, followeeId);
            throw new BusinessException(ErrorCode.FOLLOW_RELATION_NOT_FOUND);
        }
    }
}