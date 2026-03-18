package com.example.thread.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PublicMetrics {

    private int retweetCount;
    private int replyCount;
    private int likeCount;
    private int quoteCount;
    private int bookmarkCount;
    private int impressionCount;
}