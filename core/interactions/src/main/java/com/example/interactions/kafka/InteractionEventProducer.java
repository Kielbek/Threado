package com.example.interactions.kafka;

import com.example.interactions.kafka.dto.InteractionEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class InteractionEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;
    @Value("${app.kafka.topics.interactions}")
    private String topic;

    public void sendEvent(InteractionEvent event) {
        kafkaTemplate.send(topic, event.threadId().toString(), event);
        log.info("Successfully sent event to Kafka: action [{}] for thread [{}]",
                event.type(), event.threadId());
    }
}
