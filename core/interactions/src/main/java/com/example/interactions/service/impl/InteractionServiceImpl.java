package com.example.interactions.service.impl;

import com.example.interactions.dto.InteractionStatusResponse;
import com.example.interactions.entity.Bookmark;
import com.example.interactions.entity.Like;
import com.example.interactions.enums.InteractionType;
import com.example.interactions.kafka.InteractionEventProducer;
import com.example.interactions.repository.BookmarkRepository;
import com.example.interactions.repository.LikeRepository;
import com.example.interactions.service.InteractionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class InteractionServiceImpl implements InteractionService {

    private final LikeRepository likeRepository;
    private final BookmarkRepository bookmarkRepository;
    private final InteractionEventProducer interactionEventProducer;

    @Override
    @Transactional
    public void toggleLike(UUID threadId, UUID userId) {
        if (likeRepository.existsByUserIdAndThreadId(userId, threadId)) {
            likeRepository.deleteByUserIdAndThreadId(userId, threadId);
            interactionEventProducer.sendInteractionEvent(
                    threadId, userId, InteractionType.UNLIKE);
            log.info("Action [UNLIKE]: User {} from thread {}", userId, threadId);
        } else {
            likeRepository.save(Like.builder().userId(userId).threadId(threadId).build());
            interactionEventProducer.sendInteractionEvent(
                    threadId, userId, InteractionType.LIKE);
            log.info("Action [LIKE]: User {} liked thread {}", userId, threadId);
        }
    }

    @Override
    @Transactional
    public void toggleBookmark(UUID threadId, UUID userId) {
        if (bookmarkRepository.existsByUserIdAndThreadId(userId, threadId)) {
            bookmarkRepository.deleteByUserIdAndThreadId(userId, threadId);
            interactionEventProducer.sendInteractionEvent(
                    threadId, userId, InteractionType.UNBOOKMARK);
            log.info("Action [UNBOOKMARK]: User {} removed bookmark from thread {}", userId, threadId);
        } else {
            bookmarkRepository.save(Bookmark.builder().userId(userId).threadId(threadId).build());
            interactionEventProducer.sendInteractionEvent(
                    threadId, userId, InteractionType.BOOKMARK);
            log.info("Action [BOOKMARK]: User {} bookmarked thread {}", userId, threadId);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UUID> getUserBookmarkedThreadIds(UUID userId, Pageable pageable) {
        log.debug("Fetching bookmarked thread IDs for user: {}", userId);
        return bookmarkRepository.findBookmarkedThreadIdsByUserId(userId, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InteractionStatusResponse> getStatusesForUser(UUID userId, List<UUID> threadIds) {
        Set<UUID> likedIds = likeRepository.findLikedThreadIds(userId, threadIds);
        Set<UUID> bookmarkedIds = bookmarkRepository.findBookmarkedThreadIds(userId, threadIds);

        return threadIds.stream()
                .map(id -> new InteractionStatusResponse(
                        id,
                        likedIds.contains(id),
                        bookmarkedIds.contains(id)
                ))
                .collect(Collectors.toList());
    }
}