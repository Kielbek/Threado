package com.example.user.kafka;

import com.example.user.entity.User;
import com.example.user.kafka.dto.KeycloakEventDto;
import com.example.user.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeycloakUserSyncService {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final UserEventProducer userEventProducer;
    private final Keycloak keycloakAdminClient;

    private static final String REALM_NAME = "Threado";

    @Transactional
    @KafkaListener(topics = "threado.user.events", groupId = "threado-user-group")
    public void consumeKeycloakEvent(String message) {
        log.info("Received message from Kafka: {}", message);

        try {
            KeycloakEventDto event = objectMapper.readValue(message, KeycloakEventDto.class);

            if (event.type() != null) {
                switch (event.type()) {
                    case "REGISTER", "IDENTITY_PROVIDER_FIRST_LOGIN" -> syncUserFromAdminApi(event.userId());
                    case "UPDATE_EMAIL", "UPDATE_PROFILE" -> syncUserFromAdminApi(event.userId());
                    case "DELETE_ACCOUNT" -> deleteUser(event.userId());
                    default -> log.debug("Ignored event type: {}", event.type());
                }
            }

        } catch (JsonProcessingException e) {
            log.error("Error while parsing Keycloak event", e);
        }
    }

    private void syncUserFromAdminApi(String userId) {
        log.info("Starting full sync for user ID: {}", userId);

        try {
            UserRepresentation kcUser = keycloakAdminClient
                    .realm(REALM_NAME)
                    .users()
                    .get(userId)
                    .toRepresentation();

            UUID keycloakId = UUID.fromString(kcUser.getId());

            User user = userRepository.findByKeycloakId(keycloakId)
                    .orElseGet(() -> User.builder().keycloakId(keycloakId).build());

            boolean isChanged = updateFieldsIfNecessary(user, kcUser);

            if (isChanged || user.getId() == null) {
                userRepository.save(user);
                log.info("User {} synchronized successfully (Source: Admin API)", kcUser.getUsername());

                userEventProducer.sendProfileSyncEvent(user);
            }

        } catch (Exception e) {
            log.error("Failed to sync user {} from Keycloak Admin API", userId, e);
        }
    }

    private boolean updateFieldsIfNecessary(User user, UserRepresentation kcUser) {
        boolean changed = false;

        if (!compare(user.getEmail(), kcUser.getEmail())) {
            user.setEmail(kcUser.getEmail());
            changed = true;
        }
        if (!compare(user.getUsername(), kcUser.getUsername())) {
            user.setUsername(kcUser.getUsername());
            changed = true;
        }
        if (!compare(user.getFirstName(), kcUser.getFirstName())) {
            user.setFirstName(kcUser.getFirstName());
            changed = true;
        }
        if (!compare(user.getLastName(), kcUser.getLastName())) {
            user.setLastName(kcUser.getLastName());
            changed = true;
        }

        return changed;
    }

    private void deleteUser(String userId) {
        UUID keycloakId = UUID.fromString(userId);
        userRepository.findByKeycloakId(keycloakId).ifPresent(user -> {
            userRepository.delete(user);
            log.info("User with Keycloak ID {} deleted from local database", userId);
        });
    }

    private boolean compare(String current, String newValue) {
        if (current == null && newValue == null) return true;
        return current != null && current.equals(newValue);
    }
}