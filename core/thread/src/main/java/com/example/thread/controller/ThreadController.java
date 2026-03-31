package com.example.thread.controller;

import com.example.thread.dto.request.CreateThreadRequest;
import com.example.thread.dto.request.RepostRequest;
import com.example.thread.dto.response.PageResponse;
import com.example.thread.dto.response.ThreadResponse;
import com.example.thread.service.ThreadService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/threads")
@RequiredArgsConstructor
@Tag(name = "Thread", description = "Endpoints for creating and managing micro-blogging posts and reposts")
public class ThreadController {

    private final ThreadService threadService;

    @Operation(
            summary = "Create a new thread",
            description = "Analyzes content for hashtags/URLs, detects language, and persists a new thread."
    )
    @ApiResponse(responseCode = "201", description = "Thread created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input data or validation failed")
    @ApiResponse(responseCode = "503", description = "Author cache not synchronized yet")
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ThreadResponse> createThread(
            @Valid @RequestBody CreateThreadRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        ThreadResponse response = threadService.createThread(request, getUserId(jwt));
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @Operation(
            summary = "Repost or Quote a thread",
            description = "Creates a repost of an existing thread. If the request body contains text, it creates a Quote. Otherwise, it's a pure Repost."
    )
    @ApiResponse(responseCode = "200", description = "Thread reposted/quoted successfully")
    @ApiResponse(responseCode = "404", description = "Original thread or author not found")
    @PostMapping("/{threadId}/repost")
    public ResponseEntity<ThreadResponse> repostThread(
            @PathVariable UUID threadId,
            @RequestBody(required = false) RepostRequest request,
            @AuthenticationPrincipal Jwt jwt
    ) {
        ThreadResponse response = threadService.createRepost(threadId, request, getUserId(jwt));
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Get global timeline",
            description = "Retrieves a paginated list of all threads, sorted by the most recent."
    )
    @ApiResponse(responseCode = "200", description = "Successfully retrieved timeline")
    @GetMapping("/timeline")
    public ResponseEntity<PageResponse<ThreadResponse>> getGlobalTimeline(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PageResponse<ThreadResponse> response = threadService.getGlobalTimeline(page, size);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Get threads by user",
            description = "Retrieves a paginated list of threads created by a specific user (author)."
    )
    @ApiResponse(responseCode = "200", description = "Successfully retrieved user's threads")
    @ApiResponse(responseCode = "404", description = "User not found")
    @GetMapping("/public/user/{authorId}")
    public ResponseEntity<PageResponse<ThreadResponse>> getThreadsByUser(
            @PathVariable UUID authorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        PageResponse<ThreadResponse> response = threadService.getThreadsByAuthor(authorId, page, size);
        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Get multiple threads by IDs",
            description = "Retrieves a list of threads in bulk based on a provided list of UUIDs."
    )
    @ApiResponse(responseCode = "200", description = "Successfully retrieved threads")
    @PostMapping("/bulk")
    public ResponseEntity<List<ThreadResponse>> getThreadsByIds(
            @RequestBody List<UUID> threadIds
    ) {
        List<ThreadResponse> response = threadService.getThreadsByIds(threadIds);
        return ResponseEntity.ok(response);
    }

    private UUID getUserId(Jwt jwt) {
        return UUID.fromString(jwt.getSubject());
    }
}