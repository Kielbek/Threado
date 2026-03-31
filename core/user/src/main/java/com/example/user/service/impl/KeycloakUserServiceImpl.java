package com.example.user.service.impl;

import com.example.user.service.KeycloakUserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeycloakUserServiceImpl implements KeycloakUserService {

    private final Keycloak keycloak;

    @Value("${app.keycloak.realm}")
    private String realm;

    public void updateBasicUserInfo(UUID keycloakId, String firstName, String lastName, String username) {
        log.info("Initiating Keycloak user update for ID: {}", keycloakId);

        UserResource userResource = keycloak.realm(realm).users().get(keycloakId.toString());
        UserRepresentation user = userResource.toRepresentation();

        boolean isChanged = false;

        if (firstName != null && !firstName.equals(user.getFirstName())) {
            user.setFirstName(firstName);
            isChanged = true;
        }
        if (lastName != null && !lastName.equals(user.getLastName())) {
            user.setLastName(lastName);
            isChanged = true;
        }
        if (username != null && !username.equals(user.getUsername())) {
            user.setUsername(username);
            isChanged = true;
        }

        if (isChanged) {
            userResource.update(user);
            log.debug("Successfully updated user attributes in Keycloak for ID: {}", keycloakId);
        } else {
            log.debug("No basic user info changes detected for Keycloak ID: {}", keycloakId);
        }
    }
}