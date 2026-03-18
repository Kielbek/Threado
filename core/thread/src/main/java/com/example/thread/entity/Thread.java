package com.example.thread.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "thread")
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Thread {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column(columnDefinition = "TEXT")
    private String text;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "reply_settings")
    private String replySettings;

    private String lang;

    @Embedded
    private PublicMetrics publicMetrics;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "author_id", nullable = false)
    private AuthorCache author;

    @ElementCollection
    @CollectionTable(name = "tweet_hashtags", joinColumns = @JoinColumn(name = "tweet_id"))
    private List<Hashtag> hashtags = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "tweet_urls", joinColumns = @JoinColumn(name = "tweet_id"))
    private List<UrlEntity> urls = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "thread_media", joinColumns = @JoinColumn(name = "thread_id"))
    private List<Media> media = new ArrayList<>();

    @ManyToOne
    private AuthorCache authorCache;
}