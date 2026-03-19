package com.example.interactions.controller;

import com.example.interactions.dto.InteractionStatusResponse;
import com.example.interactions.service.InteractionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/interactions")
@RequiredArgsConstructor
@Tag(name = "Interactions API", description = "Endpoints for managing user engagement (likes/bookmarks)")
public class InteractionController {

    private final InteractionService interactionService;

    @PostMapping("/threads/{threadId}/like")
    @Operation(summary = "Toggle Like", description = "Like or unlike a thread.")
    public ResponseEntity<Void> toggleLike(
            @PathVariable UUID threadId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        interactionService.toggleLike(threadId, getUserId(jwt));
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/threads/{threadId}/bookmark")
    @Operation(summary = "Toggle Bookmark", description = "Bookmark or unbookmark a thread.")
    public ResponseEntity<Void> toggleBookmark(
            @PathVariable UUID threadId,
            @AuthenticationPrincipal Jwt jwt
    ) {
        interactionService.toggleBookmark(threadId, getUserId(jwt));
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bookmarks")
    @Operation(summary = "Get bookmarked threads", description = "Returns a paginated list of thread IDs saved by the user.")
    public ResponseEntity<Page<UUID>> getMyBookmarks(
            @AuthenticationPrincipal Jwt jwt,
            Pageable pageable
    ) {
        return ResponseEntity.ok(interactionService.getUserBookmarkedThreadIds(getUserId(jwt), pageable));
    }

    @GetMapping("/status")
    @Operation(summary = "Get Multiple Statuses", description = "Check if posts are liked/bookmarked by the user.")
    public ResponseEntity<List<InteractionStatusResponse>> getStatuses(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam List<UUID> threadIds
    ) {
        return ResponseEntity.ok(interactionService.getStatusesForUser(getUserId(jwt), threadIds));
    }

    private UUID getUserId(Jwt jwt) {
        return UUID.fromString(jwt.getSubject());
    }
}