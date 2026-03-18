package com.example.thread.entity;

import jakarta.persistence.Column;
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
public class Hashtag {

    @Column(name = "idx_start")
    private int startIdx;

    @Column(name = "idx_end")
    private int endIdx;

    private String tag;
}