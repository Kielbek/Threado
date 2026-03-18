package com.example.user.exception;

import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ProblemDetail handleBusinessException(BusinessException ex) {
        ErrorCode code = ex.getErrorCode();

        ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(
                code.getHttpStatus(),
                code.getDefaultMessage()
        );

        problemDetail.setTitle("Validation error");

        problemDetail.setProperty("errorCode", code.name());

        return problemDetail;
    }
}