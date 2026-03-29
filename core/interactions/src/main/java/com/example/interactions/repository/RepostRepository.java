package com.example.interactions.repository;

import com.example.interactions.entity.Repost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface RepostRepository extends JpaRepository<Repost, String> {

    @Query("SELECT r.threadId FROM Repost r WHERE r.userId = :userId AND r.threadId IN :threadIds")
    Set<UUID> findRepostedThreadIds(@Param("userId") UUID userId, @Param("threadIds") List<UUID> threadIds);

    boolean existsByUserIdAndThreadId(UUID userId, UUID threadId);

    @Modifying
    @Query("DELETE FROM Repost r WHERE r.userId = :userId AND r.threadId = :threadId")
    void deleteByUserIdAndThreadId(@Param("userId") UUID userId, @Param("threadId") UUID threadId);

}
