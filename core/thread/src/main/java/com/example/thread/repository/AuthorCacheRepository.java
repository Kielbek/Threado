package com.example.thread.repository;

import com.example.thread.entity.AuthorCache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorCacheRepository extends JpaRepository<AuthorCache, String> {
}
