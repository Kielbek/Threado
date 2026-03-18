package com.example.thread.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class UrlEntity {

    @Column(name = "idx_start")
    private int startIdx;

    @Column(name = "idx_end")
    private int endIdx;

    @Column(columnDefinition = "TEXT")
    private String url;

    @Column(name = "expanded_url", columnDefinition = "TEXT")
    private String expandedUrl;

    @Column(name = "display_url")
    private String displayUrl;
}