package com.example.interactions.repository;

import com.example.interactions.entity.Bookmark;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Repository
public interface BookmarkRepository extends JpaRepository<Bookmark, String> {

    @Query("SELECT b.threadId FROM Bookmark b WHERE b.userId = :userId AND b.threadId IN :threadIds")
    Set<UUID> findBookmarkedThreadIds(@Param("userId") UUID userId, @Param("threadIds") List<UUID> threadIds);

    @Query("SELECT b.threadId FROM Bookmark b WHERE b.userId = :userId ORDER BY b.createdAt DESC")
    Page<UUID> findBookmarkedThreadIdsByUserId(@Param("userId") UUID userId, Pageable pageable);

    boolean existsByUserIdAndThreadId(UUID userId, UUID threadId);

    void deleteByUserIdAndThreadId(UUID userId, UUID threadId);

}
