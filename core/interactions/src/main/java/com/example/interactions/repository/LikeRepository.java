package com.example.interactions.repository;

import com.example.interactions.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface LikeRepository extends JpaRepository<Like, String> {

    @Query("SELECT l.threadId FROM Like l WHERE l.userId = :userId AND l.threadId IN :threadIds")
    Set<UUID> findLikedThreadIds(@Param("userId") UUID userId, @Param("threadIds") List<UUID> threadIds);

    boolean existsByUserIdAndThreadId(UUID userId, UUID threadId);

    void deleteByUserIdAndThreadId(UUID userId, UUID threadId);

}
