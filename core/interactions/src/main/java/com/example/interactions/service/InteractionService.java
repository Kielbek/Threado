package com.example.interactions.service;

import com.example.interactions.dto.InteractionStatusResponse;
import com.example.interactions.dto.PageResponse;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface InteractionService {

    void toggleLike(UUID threadId, UUID userId);

    void toggleBookmark(UUID threadId, UUID userId);

    PageResponse<UUID> getUserBookmarkedThreadIds(UUID userId, Pageable pageable);

    List<InteractionStatusResponse> getStatusesForUser(UUID userId, List<UUID> threadIds);
}
