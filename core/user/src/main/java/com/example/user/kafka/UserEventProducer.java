package com.example.user.kafka;

import com.example.user.entity.User;
import com.example.user.kafka.dto.UserProfileSyncEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class UserEventProducer {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value("${app.kafka.topics.user-profile-sync}")
    private String syncTopic;

    public void sendProfileSyncEvent(User user) {
        UserProfileSyncEvent syncEvent = new UserProfileSyncEvent(
                user.getKeycloakId(),
                user.getUsername(),
                user.getFirstName(),
                user.getLastName(),
                user.getAvatarUrl()
        );

        kafkaTemplate.send(syncTopic, user.getKeycloakId().toString(), syncEvent);
        log.info("Sent UserProfileSyncEvent to topic '{}' for user: {}", syncTopic, user.getKeycloakId());
    }
}