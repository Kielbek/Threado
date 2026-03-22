package com.example.user.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum ErrorCode {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User entity not found in the database by provided Keycloak ID."),
    KEYCLOAK_UPDATE_FAILED(HttpStatus.CONFLICT, "Failed to update account data in the identity provider."),
    USERNAME_ALREADY_EXISTS(HttpStatus.CONFLICT, "This username is already taken. Please choose another one."),
    CANNOT_FOLLOW_SELF(HttpStatus.BAD_REQUEST, "You cannot follow your own profile."),
    FOLLOW_RELATION_NOT_FOUND(HttpStatus.NOT_FOUND, "You are not following this user.");

    private final HttpStatus httpStatus;
    private final String defaultMessage;

    ErrorCode(HttpStatus httpStatus, String defaultMessage) {
        this.httpStatus = httpStatus;
        this.defaultMessage = defaultMessage;
    }

}