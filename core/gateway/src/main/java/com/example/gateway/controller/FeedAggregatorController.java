package com.example.gateway.controller;

import com.example.gateway.dto.thread.EnrichedThreadResponse;
import com.example.gateway.dto.common.PageResponse;
import com.example.gateway.service.FeedAggregatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/feed")
@RequiredArgsConstructor
public class FeedAggregatorController {

    private final FeedAggregatorService feedAggregatorService;

    @GetMapping("/timeline")
    public Mono<PageResponse<EnrichedThreadResponse>> getTimeline(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader
    ) {
        return feedAggregatorService.getTimeline(page, size, authHeader);
    }

    @GetMapping("/bookmarks")
    public Mono<PageResponse<EnrichedThreadResponse>> getBookmarks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader
    ) {
        return feedAggregatorService.getBookmarks(page, size, authHeader);
    }

    @GetMapping("/user/{authorId}")
    public Mono<PageResponse<EnrichedThreadResponse>> getUserTimeline(
            @PathVariable String authorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestHeader(HttpHeaders.AUTHORIZATION) String authHeader
    ) {
        return feedAggregatorService.getUserTimeline(authorId, page, size, authHeader);
    }
}