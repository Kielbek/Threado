package com.example.user.kafka;

import com.example.user.entity.User;
import com.example.user.kafka.dto.KeycloakEventDto;
import com.example.user.repository.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeycloakUserSyncService {

    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final UserEventProducer userEventProducer;

    @Transactional
    @KafkaListener(topics = "threado.user.events", groupId = "threado-user-group")
    public void consumeKeycloakEvent(String message) {
        log.info("Received message from Kafka: {}", message);

        try {
            KeycloakEventDto event = objectMapper.readValue(message, KeycloakEventDto.class);

            if (event.type() != null) {
                switch (event.type()) {
                    case "REGISTER" -> syncNewUser(event);
                    case "UPDATE_EMAIL" -> updateExistingUser(event);
                    default -> log.debug("Ignored Keycloak event type: {}", event.type());
                }
            }

        } catch (JsonProcessingException e) {
            log.error("Error while parsing Keycloak event from Kafka", e);
        }
    }

    private void syncNewUser(KeycloakEventDto event) {
        String keycloakId = event.userId();

        if (userRepository.existsByKeycloakId(keycloakId)) {
            log.warn("User with Keycloak ID {} already exists in the database. Skipping creation.", keycloakId);
            return;
        }

        String username = event.details().get("username");
        String email = event.details().get("email");
        String firstName = event.details().get("first_name");
        String lastName = event.details().get("last_name");

        User newUser = User.builder()
                .keycloakId(keycloakId)
                .username(username)
                .email(email)
                .firstName(firstName)
                .lastName(lastName)
                .build();

        userRepository.save(newUser);
        log.info("Successfully synchronized new user: {}", username);

        userEventProducer.sendProfileSyncEvent(newUser);
    }

    private void updateExistingUser(KeycloakEventDto event) {
        String keycloakId = event.userId();

        userRepository.findByKeycloakId(keycloakId).ifPresentOrElse(user -> {
            boolean isUpdated = false;

            String newEmail = event.details().get("email");
            String newUsername = event.details().get("username");

            String newFirstName = event.details().get("first_name");
            String newLastName = event.details().get("last_name");

            if (newEmail != null && !newEmail.equals(user.getEmail())) {
                user.setEmail(newEmail);
                isUpdated = true;
                log.info("Updated email for user ID {}: {}", keycloakId, newEmail);
            }
            if (newUsername != null && !newUsername.equals(user.getUsername())) {
                user.setUsername(newUsername);
                isUpdated = true;
                log.info("Updated username for user ID {}: {}", keycloakId, newUsername);
            }
            if (newFirstName != null && !newFirstName.equals(user.getFirstName())) {
                user.setFirstName(newFirstName);
                isUpdated = true;
                log.info("Updated first name for user ID {}: {}", keycloakId, newFirstName);
            }
            if (newLastName != null && !newLastName.equals(user.getLastName())) {
                user.setLastName(newLastName);
                isUpdated = true;
                log.info("Updated last name for user ID {}: {}", keycloakId, newLastName);
            }

            if (isUpdated) {
                userRepository.save(user);
                log.info("Successfully synchronized updates for user ID: {}", keycloakId);

                userEventProducer.sendProfileSyncEvent(user);
            }

        }, () -> log.warn("Received update event for unknown user with Keycloak ID: {}. Skipping.", keycloakId));
    }
}