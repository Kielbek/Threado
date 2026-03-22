package com.example.user.mapper;

import com.example.user.dto.response.UserResponse;
import com.example.user.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        return new UserResponse(
                user.getKeycloakId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getBio(),
                user.getWebsiteUrl(),
                user.getAvatarUrl(),
                user.getCoverUrl(),
                user.getFollowersCount(),
                user.getFollowingCount(),
                user.getCreatedAt()
        );
    }
}