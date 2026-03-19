package com.example.interactions.service.impl;

import com.example.interactions.dto.InteractionStatusResponse;
import com.example.interactions.entity.Bookmark;
import com.example.interactions.entity.Like;
import com.example.interactions.enums.InteractionType;
import com.example.interactions.kafka.InteractionEventProducer;
import com.example.interactions.kafka.dto.InteractionEvent;
import com.example.interactions.repository.BookmarkRepository;
import com.example.interactions.repository.LikeRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class InteractionServiceTest {

    @Mock
    private LikeRepository likeRepository;

    @Mock
    private BookmarkRepository bookmarkRepository;

    @Mock
    private InteractionEventProducer kafkaProducer;

    @InjectMocks
    private InteractionServiceImpl interactionService;

    private UUID userId;
    private UUID threadId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        threadId = UUID.randomUUID();
    }

    @Test
    @DisplayName("toggleLike: Should add like and send LIKE event when post is not liked")
    void toggleLike_addsLike() {
        when(likeRepository.existsByUserIdAndThreadId(userId, threadId)).thenReturn(false);

        interactionService.toggleLike(threadId, userId);

        verify(likeRepository).save(any(Like.class));

        ArgumentCaptor<InteractionEvent> eventCaptor = ArgumentCaptor.forClass(InteractionEvent.class);
        verify(kafkaProducer).sendEvent(eventCaptor.capture());

        InteractionEvent sentEvent = eventCaptor.getValue();
        assertThat(sentEvent.type()).isEqualTo(InteractionType.LIKE);
        assertThat(sentEvent.threadId()).isEqualTo(threadId);
        assertThat(sentEvent.userId()).isEqualTo(userId);
    }

    @Test
    @DisplayName("toggleLike: Should remove like and send UNLIKE event when post is already liked")
    void toggleLike_removesLike() {
        when(likeRepository.existsByUserIdAndThreadId(userId, threadId)).thenReturn(true);

        interactionService.toggleLike(threadId, userId);

        verify(likeRepository).deleteByUserIdAndThreadId(userId, threadId);

        ArgumentCaptor<InteractionEvent> eventCaptor = ArgumentCaptor.forClass(InteractionEvent.class);
        verify(kafkaProducer).sendEvent(eventCaptor.capture());

        assertThat(eventCaptor.getValue().type()).isEqualTo(InteractionType.UNLIKE);
    }

    @Test
    @DisplayName("toggleBookmark: Should add bookmark and send BOOKMARK event")
    void toggleBookmark_addsBookmark() {
        when(bookmarkRepository.existsByUserIdAndThreadId(userId, threadId)).thenReturn(false);

        interactionService.toggleBookmark(threadId, userId);

        verify(bookmarkRepository).save(any(Bookmark.class));

        ArgumentCaptor<InteractionEvent> eventCaptor = ArgumentCaptor.forClass(InteractionEvent.class);
        verify(kafkaProducer).sendEvent(eventCaptor.capture());

        assertThat(eventCaptor.getValue().type()).isEqualTo(InteractionType.BOOKMARK);
    }

    @Test
    @DisplayName("toggleBookmark: Should remove bookmark and send UNBOOKMARK event")
    void toggleBookmark_removesBookmark() {
        when(bookmarkRepository.existsByUserIdAndThreadId(userId, threadId)).thenReturn(true);

        interactionService.toggleBookmark(threadId, userId);

        verify(bookmarkRepository).deleteByUserIdAndThreadId(userId, threadId);

        ArgumentCaptor<InteractionEvent> eventCaptor = ArgumentCaptor.forClass(InteractionEvent.class);
        verify(kafkaProducer).sendEvent(eventCaptor.capture());

        assertThat(eventCaptor.getValue().type()).isEqualTo(InteractionType.UNBOOKMARK);
    }

    @Test
    @DisplayName("getStatusesForUser: Should return correctly mapped boolean flags for UI")
    void getStatusesForUser_returnsMappedStatuses() {
        UUID threadId1 = UUID.randomUUID();
        UUID threadId2 = UUID.randomUUID();
        List<UUID> threadIds = List.of(threadId1, threadId2);

        when(likeRepository.findLikedThreadIds(userId, threadIds)).thenReturn(Set.of(threadId1));
        when(bookmarkRepository.findBookmarkedThreadIds(userId, threadIds)).thenReturn(Set.of(threadId2));

        List<InteractionStatusResponse> result = interactionService.getStatusesForUser(userId, threadIds);

        assertThat(result).hasSize(2);

        InteractionStatusResponse status1 = result.stream().filter(r -> r.threadId().equals(threadId1)).findFirst().orElseThrow();
        assertThat(status1.isLiked()).isTrue();
        assertThat(status1.isBookmarked()).isFalse();

        InteractionStatusResponse status2 = result.stream().filter(r -> r.threadId().equals(threadId2)).findFirst().orElseThrow();
        assertThat(status2.isLiked()).isFalse();
        assertThat(status2.isBookmarked()).isTrue();
    }

    @Test
    @DisplayName("getUserBookmarkedThreadIds: Should return paginated thread IDs")
    void getUserBookmarkedThreadIds_returnsPages() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<UUID> expectedPage = new PageImpl<>(List.of(threadId));

        when(bookmarkRepository.findBookmarkedThreadIdsByUserId(userId, pageable)).thenReturn(expectedPage);

        Page<UUID> result = interactionService.getUserBookmarkedThreadIds(userId, pageable);

        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0)).isEqualTo(threadId);
        verify(bookmarkRepository).findBookmarkedThreadIdsByUserId(userId, pageable);
    }
}