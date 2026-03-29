package com.example.gateway.service;

import com.example.gateway.client.InteractionServiceClient;
import com.example.gateway.client.ThreadServiceClient;
import com.example.gateway.dto.common.PageResponse;
import com.example.gateway.dto.interaction.InteractionContextResponse;
import com.example.gateway.dto.interaction.InteractionStatusResponse;
import com.example.gateway.dto.thread.EnrichedThreadResponse;
import com.example.gateway.dto.thread.ThreadResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class FeedAggregatorService {

    private final ThreadServiceClient threadClient;
    private final InteractionServiceClient interactionClient;

    public Mono<PageResponse<EnrichedThreadResponse>> getTimeline(int page, int size, String authHeader) {
        return threadClient.fetchTimeline(page, size, authHeader)
                .flatMap(threadsPage -> enrichPage(threadsPage, authHeader));
    }

    public Mono<PageResponse<EnrichedThreadResponse>> getUserTimeline(String authorId, int page, int size, String authHeader) {
        return threadClient.fetchByAuthor(authorId, page, size, authHeader)
                .flatMap(threadsPage -> enrichPage(threadsPage, authHeader));
    }

    public Mono<PageResponse<EnrichedThreadResponse>> getBookmarks(int page, int size, String authHeader) {
        return interactionClient.fetchBookmarks(page, size, authHeader)
                .flatMap(bookmarksPage -> {
                    List<UUID> threadIds = bookmarksPage.content();
                    if (threadIds.isEmpty()) return Mono.just(emptyEnrichedPage(bookmarksPage));

                    Mono<List<ThreadResponse>> threadsMono = threadClient.fetchBulk(threadIds, authHeader);
                    Mono<List<InteractionStatusResponse>> interactionsMono = interactionClient.fetchStatuses(threadIds, authHeader);

                    return Mono.zip(threadsMono, interactionsMono)
                            .map(tuple -> rebuildBookmarkedPage(bookmarksPage, tuple.getT1(), tuple.getT2()));
                });
    }

    private Mono<PageResponse<EnrichedThreadResponse>> enrichPage(PageResponse<ThreadResponse> page, String authHeader) {
        if (page.content().isEmpty()) {
            return Mono.just(emptyEnrichedPage(page));
        }

        List<UUID> threadIds = page.content().stream()
                .map(ThreadResponse::id)
                .toList();

        return interactionClient.fetchStatuses(threadIds, authHeader)
                .map(interactions -> {
                    Map<UUID, InteractionStatusResponse> statusMap = interactions.stream()
                            .collect(Collectors.toMap(InteractionStatusResponse::threadId, status -> status));

                    List<EnrichedThreadResponse> enrichedContent = page.content().stream()
                            .map(thread -> enrichSingle(thread, statusMap.get(thread.id())))
                            .toList();

                    return new PageResponse<>(
                            enrichedContent,
                            page.pageNumber(),
                            page.pageSize(),
                            page.totalElements(),
                            page.totalPages(),
                            page.isLast()
                    );
                });
    }

    private PageResponse<EnrichedThreadResponse> rebuildBookmarkedPage(PageResponse<UUID> page, List<ThreadResponse> threads, List<InteractionStatusResponse> interactions) {
        Map<UUID, ThreadResponse> threadMap = threads.stream().collect(Collectors.toMap(ThreadResponse::id, t -> t));
        Map<UUID, InteractionStatusResponse> statusMap = interactions.stream().collect(Collectors.toMap(InteractionStatusResponse::threadId, s -> s));

        List<EnrichedThreadResponse> enrichedContent = page.content().stream()
                .filter(threadMap::containsKey)
                .map(id -> enrichSingle(threadMap.get(id), statusMap.get(id)))
                .toList();

        return new PageResponse<>(
                enrichedContent,
                page.pageNumber(),
                page.pageSize(),
                page.totalElements(),
                page.totalPages(),
                page.isLast()
        );
    }

    private EnrichedThreadResponse enrichSingle(ThreadResponse thread, InteractionStatusResponse status) {
        boolean isLiked = status != null && status.isLiked();
        boolean isBookmarked = status != null && status.isBookmarked();
        boolean isReposted = status != null && status.isReposted();

        InteractionContextResponse interactionContext = new InteractionContextResponse(isLiked, isBookmarked, isReposted);

        return new EnrichedThreadResponse(
                thread.id(),
                thread.text(),
                thread.createdAt(),
                thread.replySettings(),
                thread.lang(),
                thread.repostedThread(),
                thread.publicMetrics(),
                thread.hashtags(),
                thread.urls(),
                thread.media(),
                thread.author(),
                interactionContext
        );
    }

    private <T> PageResponse<EnrichedThreadResponse> emptyEnrichedPage(PageResponse<T> page) {
        return new PageResponse<>(
                List.of(),
                page.pageNumber(),
                page.pageSize(),
                page.totalElements(),
                page.totalPages(),
                page.isLast()
        );
    }
}