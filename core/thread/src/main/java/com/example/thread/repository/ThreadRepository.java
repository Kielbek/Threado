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

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, UUID> {

    @EntityGraph(attributePaths = {"author", "repostedThread", "repostedThread.author"})
    Page<Thread> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @EntityGraph(attributePaths = {"author", "repostedThread", "repostedThread.author"})
    Page<Thread> findAllByAuthor_IdOrderByCreatedAtDesc(UUID userId, Pageable pageable);

    @EntityGraph(attributePaths = {"author", "repostedThread", "repostedThread.author"})
    List<Thread> findAllById(Iterable<UUID> threadIds);

    Optional<Thread> findByAuthorIdAndRepostedThreadIdAndTextIsNull(UUID authorId, UUID repostedThreadId);

    boolean existsByAuthorIdAndRepostedThreadIdAndText(UUID authorId, UUID repostedThreadId, String text);

    @Modifying
    @Query("UPDATE Thread t SET t.publicMetrics.likeCount = t.publicMetrics.likeCount + :value WHERE t.id = :threadId")
    void updateLikeCount(@Param("threadId") UUID threadId, @Param("value") int value);

    @Modifying
    @Query("UPDATE Thread t SET t.publicMetrics.bookmarkCount = t.publicMetrics.bookmarkCount + :value WHERE t.id = :threadId")
    void updateBookmarkCount(@Param("threadId") UUID threadId, @Param("value") int value);

    @Modifying
    @Query("UPDATE Thread t SET t.publicMetrics.repostCount = t.publicMetrics.repostCount + :value WHERE t.id = :threadId")
    void updateRepostCount(@Param("threadId") UUID threadId, @Param("value") int value);

    @Modifying
    @Query("UPDATE Thread t SET t.publicMetrics.replyCount = t.publicMetrics.replyCount + :value WHERE t.id = :threadId")
    void updateReplyCount(@Param("threadId") UUID threadId, @Param("value") int value);

}
