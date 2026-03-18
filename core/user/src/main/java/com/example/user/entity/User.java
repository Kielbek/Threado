package com.example.user.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Entity
@Table(
        name = "app_users",
        indexes = {
                @Index(name = "idx_app_user_keycloak_id", columnList = "keycloak_id", unique = true),
                @Index(name = "idx_app_user_username", columnList = "username", unique = true)
        }
)
@EntityListeners(AuditingEntityListener.class)
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", updatable = false, nullable = false)
    private UUID id;

    @NaturalId
    @Column(name = "keycloak_id", nullable = false, updatable = false, unique = true)
    private String keycloakId;

    @Column(name = "username", nullable = false, unique = true, length = 50)
    private String username;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "first_name", length = 50)
    private String firstName;

    @Column(name = "last_name", length = 50)
    private String lastName;

    @Column(name = "bio", length = 160)
    private String bio;

    @Column(name = "avatar_url", length = 500)
    private String avatarUrl;

    @Builder.Default
    @Column(name = "followers_count", nullable = false)
    private long followersCount = 0;

    @Builder.Default
    @Column(name = "following_count", nullable = false)
    private long followingCount = 0;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private Instant updatedAt;

}