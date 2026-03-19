package com.example.thread.kafka;

import com.example.thread.entity.AuthorCache;
import com.example.thread.kafka.dto.UserAvatarUpdateEventDto;
import com.example.thread.repository.AuthorCacheRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthorSyncService {

    private final AuthorCacheRepository authorCacheRepository;
    private final ObjectMapper objectMapper;

    @KafkaListener(topics = "threado.user.events", groupId = "threado-post-group")
    public void consumeKeycloakEvent(String message) {
        try {
            JsonNode node = objectMapper.readTree(message);
            String type = node.get("eventType").asText();
            String userId = node.get("userId").asText();
            JsonNode details = node.get("details");

            if ("REGISTER".equals(type) || "UPDATE_PROFILE".equals(type)) {
                AuthorCache author = authorCacheRepository.findById(userId)
                        .orElse(new AuthorCache());

                author.setId(userId);
                author.setUsername(details.get("username").asText());
                author.setName(details.get("first_name").asText() + " " + details.get("last_name").asText());

                authorCacheRepository.save(author);
                log.info("Synchronized AuthorCache from Keycloak for user: {}", userId);
            }
        } catch (Exception e) {
            log.error("Error processing Keycloak event", e);
        }
    }

    @KafkaListener(topics = "user.avatar.updated", groupId = "threado-post-group")
    public void consumeAvatarUpdate(String message) {
        try {
            UserAvatarUpdateEventDto dto = objectMapper.readValue(message, UserAvatarUpdateEventDto.class);

            authorCacheRepository.findById(dto.userId()).ifPresent(author -> {
                author.setAvatarUrl(dto.newAvatarUrl());
                authorCacheRepository.save(author);
                log.info("Updated avatar in AuthorCache for user: {}", dto.userId());
            });
        } catch (Exception e) {
            log.error("Error processing Avatar update", e);
        }
    }
}