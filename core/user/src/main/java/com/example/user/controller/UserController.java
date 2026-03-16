package com.example.user.controller;

import com.example.user.dto.response.UserResponse;
import com.example.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me") 
    public UserResponse getCurrentUser(@AuthenticationPrincipal Jwt jwt) {

        String keycloakId = jwt.getSubject();

        return userService.getUserByKeycloakId(keycloakId);
    }
}
