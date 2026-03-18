package com.example.thread.exeption;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<Object> handleBusinessException(BusinessException ex) {
        ErrorCode errorCode = ex.getErrorCode();

        Map<String, Object> body = Map.of(
                "timestamp", Instant.now(),
                "status", errorCode.getHttpStatus().value(),
                "error_code", errorCode.getCode(),
                "message", ex.getMessage()
        );

        return new ResponseEntity<>(body, errorCode.getHttpStatus());
    }
}