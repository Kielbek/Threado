package com.example.user.service;

import java.util.UUID;

public interface UserFollowService {

    void follow(UUID followerId, UUID followeeId);

    void unfollow(UUID followerId, UUID followeeId);
}
