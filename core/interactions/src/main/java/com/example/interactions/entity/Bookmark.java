package com.example.interactions.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "bookmarks",
        uniqueConstraints = {
                @UniqueConstraint(name = "uk_bookmark_user_thread", columnNames = {"user_id", "thread_id"})
        },
        indexes = {
                @Index(name = "idx_bookmark_user_id", columnList = "user_id"),
                @Index(name = "idx_bookmark_thread_id", columnList = "thread_id")
        }
)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class Bookmark {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false, updatable = false)
    private UUID userId;

    @Column(name = "thread_id", nullable = false, updatable = false)
    private UUID threadId;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;
}