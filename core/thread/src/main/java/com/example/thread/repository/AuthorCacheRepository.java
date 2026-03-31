package com.example.thread.repository;

import com.example.thread.entity.AuthorCache;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AuthorCacheRepository extends JpaRepository<AuthorCache, UUID> {
}
