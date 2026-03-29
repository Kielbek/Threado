package com.example.thread.kafka;

import com.example.thread.kafka.dto.ThreadInteractionEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ThreadEventPublisher {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${app.kafka.topics.interactions}")
    private String interactionTopic;

    public void publishInteraction(UUID threadId, UUID userId, boolean isCreated) {
        log.debug("Publishing interaction event to Kafka topic [{}] for thread: {}", interactionTopic, threadId);

        ThreadInteractionEvent event = new ThreadInteractionEvent(
                threadId,
                userId,
                isCreated
        );

        kafkaTemplate.send(interactionTopic, event.targetThreadId().toString(), event)
                .whenComplete((result, ex) -> {
                    if (ex != null) {
                        log.error("Failed to publish interaction event to Kafka for thread: {}", event.targetThreadId(), ex);
                    } else {
                        log.debug("Successfully published interaction event to Kafka for thread: {}", event.targetThreadId());
                    }
                });
    }
}