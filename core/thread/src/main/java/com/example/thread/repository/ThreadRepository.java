package com.example.thread.repository;

import com.example.thread.entity.Thread;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, String> {

    @EntityGraph(attributePaths = {"author"})
    Page<Thread> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @EntityGraph(attributePaths = {"author"})
    Page<Thread> findAllByAuthor_IdOrderByCreatedAtDesc(UUID userId, Pageable pageable);

    @Modifying
    @Query("UPDATE Thread t SET t.publicMetrics.likeCount = t.publicMetrics.likeCount + :value WHERE t.id = :threadId")
    void updateLikeCount(@Param("threadId") UUID threadId, @Param("value") int value);

    @Modifying
    @Query("UPDATE Thread t SET t.publicMetrics.bookmarkCount = t.publicMetrics.bookmarkCount + :value WHERE t.id = :threadId")
    void updateBookmarkCount(@Param("threadId") UUID threadId, @Param("value") int value);

}
