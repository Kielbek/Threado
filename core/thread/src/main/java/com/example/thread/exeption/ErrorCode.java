package com.example.thread.exeption;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    THREAD_NOT_FOUND("THREAD_001", "Thread not found", HttpStatus.NOT_FOUND),
    THREAD_CREATION_FAILED("THREAD_002", "Could not create thread", HttpStatus.BAD_REQUEST),
    UNAUTHORIZED_ACCESS("THREAD_003", "You are not authorized to perform this action", HttpStatus.FORBIDDEN),

    DUPLICATE_QUOTE_DETECTED("THREAD_004", "You have already quoted this thread with the exact same text", HttpStatus.CONFLICT),

    AUTHOR_NOT_FOUND_IN_CACHE("AUTHOR_001", "Author data is not yet synchronized", HttpStatus.SERVICE_UNAVAILABLE),
    USER_NOT_FOUND("USER_001", "User not found", HttpStatus.NOT_FOUND);

    private final String code;
    private final String message;
    private final HttpStatus httpStatus;
}