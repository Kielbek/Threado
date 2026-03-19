package com.example.thread.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.thread.entity.Thread;

@Repository
public interface ThreadRepository extends JpaRepository<Thread, String> {

    @EntityGraph(attributePaths = {"author"})
    Page<Thread> findAllByOrderByCreatedAtDesc(Pageable pageable);

    @EntityGraph(attributePaths = {"author"})
    Page<Thread> findAllByAuthorOrderByCreatedAtDesc(String userId, Pageable pageable);

}
