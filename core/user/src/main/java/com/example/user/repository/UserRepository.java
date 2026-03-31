package com.example.user.repository;

import com.example.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByKeycloakId(UUID keycloakId);

    Optional<User> findByUsername(String username);

    boolean existsByKeycloakId(UUID keycloakId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE User u SET u.followersCount = u.followersCount + 1 WHERE u.keycloakId = :userId")
    void incrementFollowersCount(@Param("userId") UUID userId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE User u SET u.followersCount = u.followersCount - 1 WHERE u.keycloakId = :userId AND u.followersCount > 0")
    void decrementFollowersCount(@Param("userId") UUID userId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE User u SET u.followingCount = u.followingCount + 1 WHERE u.keycloakId = :userId")
    void incrementFollowingCount(@Param("userId") UUID userId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Query("UPDATE User u SET u.followingCount = u.followingCount - 1 WHERE u.keycloakId = :userId AND u.followingCount > 0")
    void decrementFollowingCount(@Param("userId") UUID userId);
}
