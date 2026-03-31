package com.example.thread.kafka;

import com.example.thread.kafka.dto.InteractionEvent;
import com.example.thread.repository.ThreadRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ThreadInteractionConsumer {

    private final ThreadRepository threadRepository;
    private final ObjectMapper objectMapper;

    @Transactional
    @KafkaListener(topics = "${app.kafka.topics.interactions}", groupId = "threado-stats-group")
    public void consumeInteractionEvent(String message) throws Exception {
        InteractionEvent event = objectMapper.readValue(message, InteractionEvent.class);

        switch (event.type()) {
            case LIKE -> threadRepository.updateLikeCount(event.threadId(), 1);
            case UNLIKE -> threadRepository.updateLikeCount(event.threadId(), -1);
            case BOOKMARK -> threadRepository.updateBookmarkCount(event.threadId(), 1);
            case UNBOOKMARK -> threadRepository.updateBookmarkCount(event.threadId(), -1);
            default -> log.warn("Unknown interaction type received: {}", event.type());
        }

        log.info("Successfully updated statistics: {} for thread {}", event.type(), event.threadId());
    }
}