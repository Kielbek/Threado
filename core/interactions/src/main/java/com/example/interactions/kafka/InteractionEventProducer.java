package com.example.interactions.kafka;

import com.example.interactions.enums.InteractionType;
import com.example.interactions.kafka.dto.InteractionEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class InteractionEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${app.kafka.topics.interactions:thread.interactions.events}")
    private String topic;

    public void sendInteractionEvent(UUID threadId, UUID userId, InteractionType type) {
        InteractionEvent event = new InteractionEvent(threadId, userId, type);

        kafkaTemplate.send(topic, threadId.toString(), event);
        log.info("Sent interaction event to topic '{}': {} by user {} for thread {}", topic, type, userId, threadId);
    }
}