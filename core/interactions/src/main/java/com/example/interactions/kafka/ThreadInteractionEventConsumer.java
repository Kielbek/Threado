package com.example.interactions.kafka;

import com.example.interactions.kafka.dto.ThreadInteractionEvent;
import com.example.interactions.service.InteractionService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class ThreadInteractionEventConsumer {

    private final InteractionService interactionService;
    private final ObjectMapper objectMapper;

    @Transactional
    @KafkaListener(topics = "${app.kafka.topics.interactions}", groupId = "interaction-service-group")
    public void consumeInteractionEvent(String message) {
        try {
            ThreadInteractionEvent event = objectMapper.readValue(message, ThreadInteractionEvent.class);

            log.info("Received event from Kafka: ThreadId=[{}]",
                    event.targetThreadId());

            if (event.isCreated()) {
                interactionService.addRepost(event.targetThreadId(), event.authorId());
            } else {
                interactionService.removeRepost(event.targetThreadId(), event.authorId());
            }


        } catch (Exception e) {
            log.error("Failed to process Kafka message in InteractionService: {}", message, e);
        }
    }
}