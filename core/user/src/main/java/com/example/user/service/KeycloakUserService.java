package com.example.user.service;

public interface KeycloakUserService {

    void updateBasicUserInfo(String keycloakId, String firstName, String lastName, String username);

}
