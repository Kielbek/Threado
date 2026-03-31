package com.example.user.service;

import java.util.UUID;

public interface KeycloakUserService {

    void updateBasicUserInfo(UUID keycloakId, String firstName, String lastName, String username);

}
