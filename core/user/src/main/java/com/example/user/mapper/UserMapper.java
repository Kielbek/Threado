package com.example.user.mapper;

import com.example.user.dto.response.UserProfileResponse;
import com.example.user.dto.response.UserResponse;
import com.example.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) {
            return null;
        }

        return new UserResponse(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getUsername(),
                user.getEmail(),
                user.getAvatarUrl()
        );
    }

    public UserProfileResponse toUserProfileResponse(User user) {
        if (user == null) {
            return null;
        }

        return new UserProfileResponse(
                user.getId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getBio(),
                user.getWebsiteUrl(),
                user.getAvatarUrl(),
                user.getFollowersCount(),
                user.getFollowingCount(),
                user.getCreatedAt()
        );
    }
}