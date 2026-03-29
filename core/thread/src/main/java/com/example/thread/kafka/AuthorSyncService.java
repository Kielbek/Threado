package com.example.thread.kafka;

import com.example.thread.entity.AuthorCache;
import com.example.thread.kafka.dto.UserProfileSyncEvent;
import com.example.thread.repository.AuthorCacheRepository;
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

    @KafkaListener(topics = "${app.kafka.topics.user-profile-sync:user.profile.synced}", groupId = "threado-post-group")
    public void consumeUserProfileSync(String message) {
        try {
            UserProfileSyncEvent event = objectMapper.readValue(message, UserProfileSyncEvent.class);

            AuthorCache author = authorCacheRepository.findById(event.userId())
                    .orElse(new AuthorCache());

            author.setId(event.userId());
            author.setUsername(event.username());

            String firstName = event.firstName() != null ? event.firstName() : "";
            String lastName = event.lastName() != null ? event.lastName() : "";
            author.setName((firstName + " " + lastName).trim());

            if (event.avatarUrl() != null) {
                author.setAvatarUrl(event.avatarUrl());
            }

            authorCacheRepository.save(author);
            log.info("Synchronized AuthorCache from User Service for user: {}", event.userId());

        } catch (Exception e) {
            log.error("Error processing UserProfileSyncEvent", e);
        }
    }
}